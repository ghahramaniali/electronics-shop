-- Electronics Shop Database Schema
-- PostgreSQL Database

-- Users Table (کاربران)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table (محصولات)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    category VARCHAR(100),
    brand VARCHAR(100),
    image_url VARCHAR(500),
    sku VARCHAR(50) UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase History Table (تاریخچه خرید)
CREATE TABLE purchase_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'completed' -- pending, completed, cancelled
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_purchase_history_user_id ON purchase_history(user_id);
CREATE INDEX idx_purchase_history_product_id ON purchase_history(product_id);
CREATE INDEX idx_purchase_history_date ON purchase_history(purchase_date);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data insertion (optional)
INSERT INTO users (username, email, password_hash, first_name, last_name, phone) VALUES
('admin', 'admin@shop.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', '09123456789'),
('customer1', 'customer1@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'علی', 'رضایی', '09876543210');

INSERT INTO products (name, description, price, stock_quantity, category, brand, sku) VALUES
('گوشی موبایل سامسونگ A54', 'گوشی موبایل سامسونگ گلکسی A54 با حافظه 128 گیگابایت', 12500000, 50, 'موبایل', 'Samsung', 'SAM-A54-128'),
('لپتاپ لنوو ThinkPad', 'لپتاپ لنوو ThinkPad E15 با پردازنده Intel i5', 28000000, 25, 'لپتاپ', 'Lenovo', 'LEN-TP-E15'),
('هدفون بیسیم Apple AirPods', 'هدفون بیسیم اپل AirPods نسل دوم', 4500000, 100, 'لوازم جانبی', 'Apple', 'APP-AIRPODS2');

INSERT INTO purchase_history (user_id, product_id, quantity, unit_price, total_price) VALUES
(2, 1, 1, 12500000, 12500000),
(2, 3, 1, 4500000, 4500000);
