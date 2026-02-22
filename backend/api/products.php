<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Product.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $product->id = $_GET['id'];
            if($product->readOne()) {
                $product_arr = array(
                    "id" => $product->id,
                    "name" => $product->name,
                    "description" => $product->description,
                    "price" => $product->price,
                    "stock_quantity" => $product->stock_quantity,
                    "category" => $product->category,
                    "brand" => $product->brand,
                    "image_url" => $product->image_url,
                    "sku" => $product->sku,
                    "is_active" => $product->is_active,
                    "created_at" => $product->created_at,
                    "updated_at" => $product->updated_at
                );
                http_response_code(200);
                echo json_encode($product_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Product not found."));
            }
        } elseif (isset($_GET['search'])) {
            $keywords = $_GET['search'];
            $stmt = $product->search($keywords);
            $products_arr = array();
            $products_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $product_item = array(
                    "id" => $id,
                    "name" => $name,
                    "description" => $description,
                    "price" => $price,
                    "stock_quantity" => $stock_quantity,
                    "category" => $category,
                    "brand" => $brand,
                    "image_url" => $image_url,
                    "sku" => $sku,
                    "is_active" => $is_active,
                    "created_at" => $created_at,
                    "updated_at" => $updated_at
                );
                array_push($products_arr["records"], $product_item);
            }

            http_response_code(200);
            echo json_encode($products_arr);
        } elseif (isset($_GET['category'])) {
            $category = $_GET['category'];
            $stmt = $product->getByCategory($category);
            $products_arr = array();
            $products_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $product_item = array(
                    "id" => $id,
                    "name" => $name,
                    "description" => $description,
                    "price" => $price,
                    "stock_quantity" => $stock_quantity,
                    "category" => $category,
                    "brand" => $brand,
                    "image_url" => $image_url,
                    "sku" => $sku,
                    "is_active" => $is_active,
                    "created_at" => $created_at,
                    "updated_at" => $updated_at
                );
                array_push($products_arr["records"], $product_item);
            }

            http_response_code(200);
            echo json_encode($products_arr);
        } else {
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
            $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
            
            $stmt = $product->readWithPagination($limit, $offset);
            $products_arr = array();
            $products_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $product_item = array(
                    "id" => $id,
                    "name" => $name,
                    "description" => $description,
                    "price" => $price,
                    "stock_quantity" => $stock_quantity,
                    "category" => $category,
                    "brand" => $brand,
                    "image_url" => $image_url,
                    "sku" => $sku,
                    "is_active" => $is_active,
                    "created_at" => $created_at,
                    "updated_at" => $updated_at
                );
                array_push($products_arr["records"], $product_item);
            }

            http_response_code(200);
            echo json_encode($products_arr);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->name) && !empty($data->price) && isset($data->stock_quantity)) {
            $product->name = $data->name;
            $product->description = $data->description ?? null;
            $product->price = $data->price;
            $product->stock_quantity = $data->stock_quantity;
            $product->category = $data->category ?? null;
            $product->brand = $data->brand ?? null;
            $product->image_url = $data->image_url ?? null;
            $product->sku = $data->sku ?? null;
            $product->is_active = $data->is_active ?? true;

            if($product->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Product created successfully.", "id" => $product->id));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create product."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        if (isset($_GET['id']) && !empty($data->name) && !empty($data->price) && isset($data->stock_quantity)) {
            $product->id = $_GET['id'];
            $product->name = $data->name;
            $product->description = $data->description ?? null;
            $product->price = $data->price;
            $product->stock_quantity = $data->stock_quantity;
            $product->category = $data->category ?? null;
            $product->brand = $data->brand ?? null;
            $product->image_url = $data->image_url ?? null;
            $product->sku = $data->sku ?? null;
            $product->is_active = $data->is_active ?? true;

            if($product->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Product updated successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update product."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update product. Data is incomplete."));
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $product->id = $_GET['id'];
            
            if($product->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "Product deleted successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete product."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete product. ID is required."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
