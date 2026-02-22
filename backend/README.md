# Electronics Shop Backend

A RESTful API backend for an electronics shop built with PHP and PostgreSQL.

## Features

- **User Management** (کاربران)
  - CRUD operations for users
  - Authentication and authorization
  - User profile management

- **Product Management** (محصولات)
  - CRUD operations for products
  - Product search and filtering
  - Category-based browsing
  - Stock management

- **Purchase History** (تاریخچه خرید)
  - Track user purchases
  - Purchase statistics and reports
  - Monthly sales reports
  - Top selling products analysis

## Database Schema

The database uses PostgreSQL with the following main tables:

### Users Table (کاربران)
- User registration and authentication
- Profile information (name, email, phone, address)
- Timestamps for creation and updates

### Products Table (محصولات)
- Product information (name, description, price)
- Inventory management (stock quantity)
- Categorization and branding
- Product images and SKU

### Purchase History Table (تاریخچه خرید)
- Purchase records with user and product references
- Quantity and pricing information
- Purchase status tracking
- Timestamps for purchase dates

## API Endpoints

### Users
- `GET /api/users.php` - Get all users
- `GET /api/users.php?id={id}` - Get specific user
- `POST /api/users.php` - Create new user
- `PUT /api/users.php?id={id}` - Update user
- `DELETE /api/users.php?id={id}` - Delete user

### Products
- `GET /api/products.php` - Get all products (with pagination)
- `GET /api/products.php?id={id}` - Get specific product
- `GET /api/products.php?search={keywords}` - Search products
- `GET /api/products.php?category={category}` - Get products by category
- `POST /api/products.php` - Create new product
- `PUT /api/products.php?id={id}` - Update product
- `DELETE /api/products.php?id={id}` - Delete product (soft delete)

### Purchase History
- `GET /api/purchases.php` - Get all purchase records
- `GET /api/purchases.php?id={id}` - Get specific purchase
- `GET /api/purchases.php?user_id={id}` - Get user's purchase history
- `GET /api/purchases.php?statistics=true` - Get purchase statistics
- `GET /api/purchases.php?monthly_report=true&year={year}` - Get monthly sales report
- `GET /api/purchases.php?top_products=true&limit={limit}` - Get top selling products
- `POST /api/purchases.php` - Create new purchase record
- `PUT /api/purchases.php?id={id}` - Update purchase status
- `DELETE /api/purchases.php?id={id}` - Delete purchase record

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL on your system
2. Create a new database:
   ```sql
   CREATE DATABASE electronics_shop;
   ```
3. Import the database schema:
   ```bash
   psql -d electronics_shop -f backend/database/schema.sql
   ```

### 2. PHP Configuration

1. Ensure PHP 8.0+ is installed
2. Install PostgreSQL PHP extension:
   - On Ubuntu/Debian: `sudo apt-get install php-pgsql`
   - On Windows: Uncomment `extension=pdo_pgsql` in php.ini
3. Install Composer if not already installed

### 3. Project Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Configure database connection in `config/database.php`:
   ```php
   private $host = 'localhost';
   private $port = '5432';
   private $dbname = 'electronics_shop';
   private $username = 'your_postgres_username';
   private $password = 'your_postgres_password';
   ```

### 4. Running the Server

1. Start the PHP development server:
   ```bash
   composer run start
   ```
   Or manually:
   ```bash
   php -S localhost:8000 -t api
   ```

2. The API will be available at `http://localhost:8000`

## Example API Usage

### Create a new user
```bash
curl -X POST http://localhost:8000/users.php \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password_hash": "secure_password",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

### Get all products
```bash
curl http://localhost:8000/products.php
```

### Search products
```bash
curl "http://localhost:8000/products.php?search=samsung"
```

### Create a purchase record
```bash
curl -X POST http://localhost:8000/purchases.php \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "product_id": 1,
    "quantity": 2,
    "unit_price": 12500000
  }'
```

## Security Considerations

- All inputs are sanitized using `htmlspecialchars()` and `strip_tags()`
- Passwords are hashed using PHP's `password_hash()` function
- SQL injection prevention using prepared statements
- CORS headers configured for cross-origin requests
- Input validation for required fields

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `405` - Method Not Allowed
- `503` - Service Unavailable

Error responses include descriptive messages in JSON format.

## Project Structure

```
backend/
├── api/                    # API endpoint files
│   ├── users.php          # User management endpoints
│   ├── products.php       # Product management endpoints
│   └── purchases.php      # Purchase history endpoints
├── config/
│   └── database.php       # Database configuration
├── models/                # Data models
│   ├── User.php          # User model
│   ├── Product.php       # Product model
│   └── PurchaseHistory.php # Purchase history model
├── database/
│   └── schema.sql        # Database schema and sample data
├── composer.json         # PHP dependencies
└── README.md            # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
