<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/PurchaseHistory.php';

$database = new Database();
$db = $database->getConnection();

$purchase = new PurchaseHistory($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $purchase->id = $_GET['id'];
            if($purchase->readOne()) {
                $purchase_arr = array(
                    "id" => $purchase->id,
                    "user_id" => $purchase->user_id,
                    "product_id" => $purchase->product_id,
                    "quantity" => $purchase->quantity,
                    "unit_price" => $purchase->unit_price,
                    "total_price" => $purchase->total_price,
                    "purchase_date" => $purchase->purchase_date,
                    "status" => $purchase->status
                );
                http_response_code(200);
                echo json_encode($purchase_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Purchase record not found."));
            }
        } elseif (isset($_GET['user_id'])) {
            $purchase->user_id = $_GET['user_id'];
            $stmt = $purchase->readByUser();
            $purchases_arr = array();
            $purchases_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $purchase_item = array(
                    "id" => $id,
                    "user_id" => $user_id,
                    "product_id" => $product_id,
                    "quantity" => $quantity,
                    "unit_price" => $unit_price,
                    "total_price" => $total_price,
                    "purchase_date" => $purchase_date,
                    "status" => $status,
                    "product_name" => $product_name,
                    "sku" => $sku,
                    "image_url" => $image_url
                );
                array_push($purchases_arr["records"], $purchase_item);
            }

            http_response_code(200);
            echo json_encode($purchases_arr);
        } elseif (isset($_GET['statistics'])) {
            $stats = $purchase->getStatistics();
            http_response_code(200);
            echo json_encode($stats);
        } elseif (isset($_GET['monthly_report'])) {
            $year = isset($_GET['year']) ? $_GET['year'] : null;
            $stmt = $purchase->getMonthlyReport($year);
            $report_arr = array();
            $report_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($report_arr["records"], $row);
            }

            http_response_code(200);
            echo json_encode($report_arr);
        } elseif (isset($_GET['top_products'])) {
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
            $stmt = $purchase->getTopSellingProducts($limit);
            $products_arr = array();
            $products_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($products_arr["records"], $row);
            }

            http_response_code(200);
            echo json_encode($products_arr);
        } else {
            $stmt = $purchase->readAll();
            $purchases_arr = array();
            $purchases_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $purchase_item = array(
                    "id" => $id,
                    "user_id" => $user_id,
                    "product_id" => $product_id,
                    "quantity" => $quantity,
                    "unit_price" => $unit_price,
                    "total_price" => $total_price,
                    "purchase_date" => $purchase_date,
                    "status" => $status,
                    "username" => $username,
                    "email" => $email,
                    "product_name" => $product_name,
                    "sku" => $sku
                );
                array_push($purchases_arr["records"], $purchase_item);
            }

            http_response_code(200);
            echo json_encode($purchases_arr);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->user_id) && !empty($data->product_id) && !empty($data->quantity) && !empty($data->unit_price)) {
            $purchase->user_id = $data->user_id;
            $purchase->product_id = $data->product_id;
            $purchase->quantity = $data->quantity;
            $purchase->unit_price = $data->unit_price;
            $purchase->total_price = $data->quantity * $data->unit_price;
            $purchase->status = $data->status ?? 'completed';

            if($purchase->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Purchase record created successfully.", "id" => $purchase->id));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create purchase record."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create purchase record. Data is incomplete."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        if (isset($_GET['id']) && !empty($data->status)) {
            $purchase->id = $_GET['id'];
            $purchase->status = $data->status;

            if($purchase->updateStatus()) {
                http_response_code(200);
                echo json_encode(array("message" => "Purchase status updated successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update purchase status."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update purchase status. Data is incomplete."));
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $purchase->id = $_GET['id'];
            
            if($purchase->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "Purchase record deleted successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete purchase record."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete purchase record. ID is required."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
