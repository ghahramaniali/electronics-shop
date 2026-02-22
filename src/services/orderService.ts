import { apiClient, ApiResponse, PaginatedResponse } from "./api";
import { Order } from "./types";

export class OrderService {
  async getOrders(
    page: number = 1,
    limit: number = 10,
    status?: string,
    search?: string,
    dateFrom?: string,
    dateTo?: string,
  ): Promise<PaginatedResponse<Order>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status) params.append("status", status);
    if (search) params.append("search", search);
    if (dateFrom) params.append("dateFrom", dateFrom);
    if (dateTo) params.append("dateTo", dateTo);

    return apiClient.getPaginated<Order>(`/orders?${params.toString()}`);
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return apiClient.get<Order>(`/orders/${id}`);
  }

  async createOrder(
    orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<Order>> {
    return apiClient.post<Order>("/orders", orderData);
  }

  async updateOrderStatus(
    id: string,
    status: Order["status"],
  ): Promise<ApiResponse<Order>> {
    return apiClient.put<Order>(`/orders/${id}/status`, { status });
  }

  async updatePaymentStatus(
    id: string,
    paymentStatus: Order["paymentStatus"],
  ): Promise<ApiResponse<Order>> {
    return apiClient.put<Order>(`/orders/${id}/payment-status`, {
      paymentStatus,
    });
  }

  async cancelOrder(id: string, reason?: string): Promise<ApiResponse<Order>> {
    return apiClient.put<Order>(`/orders/${id}/cancel`, { reason });
  }

  async getCustomerOrders(customerId: string): Promise<ApiResponse<Order[]>> {
    return apiClient.get<Order[]>(`/customers/${customerId}/orders`);
  }

  async getRecentOrders(limit: number = 10): Promise<ApiResponse<Order[]>> {
    return apiClient.get<Order[]>(`/orders/recent?limit=${limit}`);
  }

  async getOrderStats(
    period: "day" | "week" | "month" | "year" = "month",
  ): Promise<
    ApiResponse<{
      totalOrders: number;
      totalRevenue: number;
      averageOrderValue: number;
      ordersByStatus: Record<string, number>;
      revenueByPeriod: Array<{ date: string; revenue: number; orders: number }>;
    }>
  > {
    return apiClient.get(`/orders/stats?period=${period}`);
  }

  async exportOrders(
    format: "csv" | "excel" = "csv",
    filters?: {
      status?: string;
      dateFrom?: string;
      dateTo?: string;
      customer?: string;
    },
  ): Promise<Blob> {
    const params = new URLSearchParams({ format });

    if (filters) {
      if (filters.status) params.append("status", filters.status);
      if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
      if (filters.dateTo) params.append("dateTo", filters.dateTo);
      if (filters.customer) params.append("customer", filters.customer);
    }

    const response = await fetch(
      `${apiClient.baseURL}/orders/export?${params.toString()}`,
    );
    return response.blob();
  }

  async updateTrackingInfo(
    id: string,
    trackingNumber: string,
    carrier: string,
  ): Promise<ApiResponse<Order>> {
    return apiClient.put<Order>(`/orders/${id}/tracking`, {
      trackingNumber,
      carrier,
    });
  }

  async refundOrder(
    id: string,
    items: Array<{ orderItemId: string; quantity: number; reason: string }>,
  ): Promise<ApiResponse<Order>> {
    return apiClient.post<Order>(`/orders/${id}/refund`, { items });
  }
}

export const orderService = new OrderService();
