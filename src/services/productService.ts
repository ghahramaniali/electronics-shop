import { apiClient, ApiResponse, PaginatedResponse } from './api'
import { Product, Category } from './types'

export class ProductService {
  async getProducts(
    page: number = 1,
    limit: number = 10,
    category?: string,
    search?: string,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc'
  ): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (category) params.append('category', category)
    if (search) params.append('search', search)
    if (sortBy) params.append('sortBy', sortBy)
    if (sortOrder) params.append('sortOrder', sortOrder)

    return apiClient.getPaginated<Product>(`/products?${params.toString()}`)
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return apiClient.get<Product>(`/products/${id}`)
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    return apiClient.post<Product>('/products', product)
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<ApiResponse<Product>> {
    return apiClient.put<Product>(`/products/${id}`, product)
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/products/${id}`)
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>('/categories')
  }

  async getFeaturedProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/featured?limit=${limit}`)
  }

  async getPopularProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/popular?limit=${limit}`)
  }

  async getNewArrivals(limit: number = 8): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/new?limit=${limit}`)
  }

  async getDiscountedProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/discounted?limit=${limit}`)
  }

  async searchProducts(query: string, filters?: {
    category?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
  }): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams({ query })
    
    if (filters) {
      if (filters.category) params.append('category', filters.category)
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
      if (filters.inStock) params.append('inStock', 'true')
    }

    return apiClient.getPaginated<Product>(`/products/search?${params.toString()}`)
  }

  async updateStock(id: string, quantity: number): Promise<ApiResponse<Product>> {
    return apiClient.put<Product>(`/products/${id}/stock`, { quantity })
  }

  async bulkUpdateProducts(updates: Array<{ id: string; changes: Partial<Product> }>): Promise<ApiResponse<Product[]>> {
    return apiClient.post<Product[]>('/products/bulk-update', { updates })
  }
}

export const productService = new ProductService()
