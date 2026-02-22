<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $user->id = $_GET['id'];
            if($user->readOne()) {
                $user_arr = array(
                    "id" => $user->id,
                    "username" => $user->username,
                    "email" => $user->email,
                    "first_name" => $user->first_name,
                    "last_name" => $user->last_name,
                    "phone" => $user->phone,
                    "address" => $user->address,
                    "created_at" => $user->created_at,
                    "updated_at" => $user->updated_at
                );
                http_response_code(200);
                echo json_encode($user_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "User not found."));
            }
        } else {
            $stmt = $user->readAll();
            $users_arr = array();
            $users_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $user_item = array(
                    "id" => $id,
                    "username" => $username,
                    "email" => $email,
                    "first_name" => $first_name,
                    "last_name" => $last_name,
                    "phone" => $phone,
                    "address" => $address,
                    "created_at" => $created_at,
                    "updated_at" => $updated_at
                );
                array_push($users_arr["records"], $user_item);
            }

            http_response_code(200);
            echo json_encode($users_arr);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->username) && !empty($data->email) && !empty($data->password_hash)) {
            $user->username = $data->username;
            $user->email = $data->email;
            $user->password_hash = $data->password_hash;
            $user->first_name = $data->first_name ?? null;
            $user->last_name = $data->last_name ?? null;
            $user->phone = $data->phone ?? null;
            $user->address = $data->address ?? null;

            if($user->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "User created successfully.", "id" => $user->id));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create user."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        if (isset($_GET['id']) && !empty($data->username) && !empty($data->email)) {
            $user->id = $_GET['id'];
            $user->username = $data->username;
            $user->email = $data->email;
            $user->first_name = $data->first_name ?? null;
            $user->last_name = $data->last_name ?? null;
            $user->phone = $data->phone ?? null;
            $user->address = $data->address ?? null;

            if($user->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "User updated successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update user."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update user. Data is incomplete."));
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $user->id = $_GET['id'];
            
            if($user->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "User deleted successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete user."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete user. ID is required."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
