<?php
require_once __DIR__ . '/../config/database.php';

class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $description;
    public $price;
    public $stock_quantity;
    public $category;
    public $brand;
    public $image_url;
    public $sku;
    public $is_active;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create new product
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                (name, description, price, stock_quantity, category, brand, image_url, sku, is_active) 
                VALUES (:name, :description, :price, :stock_quantity, :category, :brand, :image_url, :sku, :is_active) 
                RETURNING id";

        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->stock_quantity = htmlspecialchars(strip_tags($this->stock_quantity));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->brand = htmlspecialchars(strip_tags($this->brand));
        $this->image_url = htmlspecialchars(strip_tags($this->image_url));
        $this->sku = htmlspecialchars(strip_tags($this->sku));
        $this->is_active = htmlspecialchars(strip_tags($this->is_active));

        // Bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":stock_quantity", $this->stock_quantity);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":brand", $this->brand);
        $stmt->bindParam(":image_url", $this->image_url);
        $stmt->bindParam(":sku", $this->sku);
        $stmt->bindParam(":is_active", $this->is_active);

        if($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            return true;
        }
        return false;
    }

    // Read all products
    public function readAll() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE is_active = true ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Read products with pagination
    public function readWithPagination($limit = 10, $offset = 0) {
        $query = "SELECT * FROM " . $this->table_name . " 
                WHERE is_active = true 
                ORDER BY created_at DESC 
                LIMIT :limit OFFSET :offset";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
        $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    // Read single product
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->name = $row['name'];
            $this->description = $row['description'];
            $this->price = $row['price'];
            $this->stock_quantity = $row['stock_quantity'];
            $this->category = $row['category'];
            $this->brand = $row['brand'];
            $this->image_url = $row['image_url'];
            $this->sku = $row['sku'];
            $this->is_active = $row['is_active'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    // Update product
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET
                name = :name,
                description = :description,
                price = :price,
                stock_quantity = :stock_quantity,
                category = :category,
                brand = :brand,
                image_url = :image_url,
                sku = :sku,
                is_active = :is_active
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->stock_quantity = htmlspecialchars(strip_tags($this->stock_quantity));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->brand = htmlspecialchars(strip_tags($this->brand));
        $this->image_url = htmlspecialchars(strip_tags($this->image_url));
        $this->sku = htmlspecialchars(strip_tags($this->sku));
        $this->is_active = htmlspecialchars(strip_tags($this->is_active));

        // Bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":stock_quantity", $this->stock_quantity);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":brand", $this->brand);
        $stmt->bindParam(":image_url", $this->image_url);
        $stmt->bindParam(":sku", $this->sku);
        $stmt->bindParam(":is_active", $this->is_active);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    // Delete product (soft delete by setting is_active to false)
    public function delete() {
        $query = "UPDATE " . $this->table_name . " SET is_active = false WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }

    // Search products
    public function search($keywords) {
        $query = "SELECT * FROM " . $this->table_name . " 
                WHERE is_active = true AND 
                (name LIKE :keywords OR 
                 description LIKE :keywords OR 
                 category LIKE :keywords OR 
                 brand LIKE :keywords)
                ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $keywords = "%{$keywords}%";
        $stmt->bindParam(":keywords", $keywords);
        $stmt->execute();
        return $stmt;
    }

    // Get products by category
    public function getByCategory($category) {
        $query = "SELECT * FROM " . $this->table_name . " 
                WHERE is_active = true AND category = :category 
                ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":category", $category);
        $stmt->execute();
        return $stmt;
    }

    // Update stock quantity
    public function updateStock($quantity) {
        $query = "UPDATE " . $this->table_name . " SET stock_quantity = :quantity WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":quantity", $quantity, PDO::PARAM_INT);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }
}
?>
