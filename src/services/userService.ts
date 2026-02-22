import { apiClient, ApiResponse, PaginatedResponse } from './api'
import { User } from './types'

export class UserService {
  async getUsers(
    page: number = 1,
    limit: number = 10,
    search?: string,
    role?: string,
    status?: string
  ): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (search) params.append('search', search)
    if (role) params.append('role', role)
    if (status) params.append('status', status)

    return apiClient.getPaginated<User>(`/users?${params.toString()}`)
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return apiClient.get<User>(`/users/${id}`)
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'lastLoginAt'>): Promise<ApiResponse<User>> {
    return apiClient.post<User>('/users', userData)
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`/users/${id}`, userData)
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/users/${id}`)
  }

  async toggleUserStatus(id: string): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`/users/${id}/toggle-status`)
  }

  async getUserStats(): Promise<ApiResponse<{
    totalUsers: number
    activeUsers: number
    newUsersThisMonth: number
    usersByRole: Record<string, number>
    userGrowth: Array<{ month: string; count: number }>
  }>> {
    return apiClient.get('/users/stats')
  }

  async getNewUsers(limit: number = 10): Promise<ApiResponse<User[]>> {
    return apiClient.get<User[]>(`/users/new?limit=${limit}`)
  }

  async updateUserRole(id: string, role: User['role']): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`/users/${id}/role`, { role })
  }

  async resetPassword(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/users/${id}/reset-password`)
  }

  async exportUsers(format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    const response = await fetch(`${apiClient.baseURL}/users/export?format=${format}`)
    return response.blob()
  }
}

export const userService = new UserService()
