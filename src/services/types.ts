export interface Product {
  id: string
  name: string
  nameFa: string
  price: number
  image: string
  description: string
  descriptionFa: string
  category: string
  stock: number
  specs: Record<string, string>
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: string
  name: string
  nameFa: string
  description?: string
  productCount?: number
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  shippingAddress: Address
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer'
  paymentStatus: 'pending' | 'paid' | 'failed'
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: 'customer' | 'admin'
  isActive: boolean
  createdAt: string
  lastLoginAt?: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  isVerified: boolean
  createdAt: string
  updatedAt?: string
}

export interface DashboardStats {
  totalRevenue: number
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  revenueChange: number
  ordersChange: number
  customersChange: number
  productsChange: number
}

export interface SalesData {
  date: string
  revenue: number
  orders: number
  customers: number
}

export interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}
