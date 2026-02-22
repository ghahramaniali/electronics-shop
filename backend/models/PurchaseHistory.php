<?php
require_once __DIR__ . '/../config/database.php';

class PurchaseHistory {
    private $conn;
    private $table_name = "purchase_history";

    public $id;
    public $user_id;
    public $product_id;
    public $quantity;
    public $unit_price;
    public $total_price;
    public $purchase_date;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create new purchase record
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                (user_id, product_id, quantity, unit_price, total_price, status) 
                VALUES (:user_id, :product_id, :quantity, :unit_price, :total_price, :status) 
                RETURNING id";

        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->quantity = htmlspecialchars(strip_tags($this->quantity));
        $this->unit_price = htmlspecialchars(strip_tags($this->unit_price));
        $this->total_price = htmlspecialchars(strip_tags($this->total_price));
        $this->status = htmlspecialchars(strip_tags($this->status));

        // Bind values
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":product_id", $this->product_id);
        $stmt->bindParam(":quantity", $this->quantity);
        $stmt->bindParam(":unit_price", $this->unit_price);
        $stmt->bindParam(":total_price", $this->total_price);
        $stmt->bindParam(":status", $this->status);

        if($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            return true;
        }
        return false;
    }

    // Read all purchase history
    public function readAll() {
        $query = "SELECT ph.*, u.username, u.email, p.name as product_name, p.sku 
                FROM " . $this->table_name . " ph
                LEFT JOIN users u ON ph.user_id = u.id
                LEFT JOIN products p ON ph.product_id = p.id
                ORDER BY ph.purchase_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Read purchase history by user
    public function readByUser() {
        $query = "SELECT ph.*, p.name as product_name, p.sku, p.image_url
                FROM " . $this->table_name . " ph
                LEFT JOIN products p ON ph.product_id = p.id
                WHERE ph.user_id = :user_id
                ORDER BY ph.purchase_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->execute();
        return $stmt;
    }

    // Read single purchase record
    public function readOne() {
        $query = "SELECT ph.*, u.username, u.email, p.name as product_name, p.sku 
                FROM " . $this->table_name . " ph
                LEFT JOIN users u ON ph.user_id = u.id
                LEFT JOIN products p ON ph.product_id = p.id
                WHERE ph.id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->user_id = $row['user_id'];
            $this->product_id = $row['product_id'];
            $this->quantity = $row['quantity'];
            $this->unit_price = $row['unit_price'];
            $this->total_price = $row['total_price'];
            $this->purchase_date = $row['purchase_date'];
            $this->status = $row['status'];
            return true;
        }
        return false;
    }

    // Update purchase status
    public function updateStatus() {
        $query = "UPDATE " . $this->table_name . " SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        $this->status = htmlspecialchars(strip_tags($this->status));
        
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id", $this->id);
        
        return $stmt->execute();
    }

    // Delete purchase record
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }

    // Get purchase statistics
    public function getStatistics() {
        $query = "SELECT 
                    COUNT(*) as total_purchases,
                    SUM(total_price) as total_revenue,
                    AVG(total_price) as avg_purchase_value,
                    COUNT(DISTINCT user_id) as unique_customers
                FROM " . $this->table_name . " 
                WHERE status = 'completed'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Get monthly sales report
    public function getMonthlyReport($year = null) {
        if ($year === null) {
            $year = date('Y');
        }
        
        $query = "SELECT 
                    EXTRACT(MONTH FROM purchase_date) as month,
                    COUNT(*) as total_orders,
                    SUM(total_price) as total_revenue,
                    SUM(quantity) as total_items
                FROM " . $this->table_name . " 
                WHERE status = 'completed' 
                AND EXTRACT(YEAR FROM purchase_date) = :year
                GROUP BY EXTRACT(MONTH FROM purchase_date)
                ORDER BY month";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":year", $year);
        $stmt->execute();
        return $stmt;
    }

    // Get top selling products
    public function getTopSellingProducts($limit = 10) {
        $query = "SELECT 
                    p.id, p.name, p.category, p.brand,
                    SUM(ph.quantity) as total_sold,
                    SUM(ph.total_price) as total_revenue
                FROM " . $this->table_name . " ph
                LEFT JOIN products p ON ph.product_id = p.id
                WHERE ph.status = 'completed'
                GROUP BY p.id, p.name, p.category, p.brand
                ORDER BY total_sold DESC
                LIMIT :limit";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }
}
?>
