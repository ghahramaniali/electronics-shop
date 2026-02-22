import { apiClient, ApiResponse } from "./api";
import { DashboardStats, SalesData, TopProduct } from "./types";

export class DashboardService {
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiClient.get<DashboardStats>("/dashboard/stats");
  }

  async getSalesData(
    period: "day" | "week" | "month" | "year" = "month",
  ): Promise<ApiResponse<SalesData[]>> {
    return apiClient.get<SalesData[]>(`/dashboard/sales?period=${period}`);
  }

  async getTopProducts(limit: number = 10): Promise<ApiResponse<TopProduct[]>> {
    return apiClient.get<TopProduct[]>(
      `/dashboard/top-products?limit=${limit}`,
    );
  }

  async getRecentOrders(limit: number = 10): Promise<
    ApiResponse<
      Array<{
        id: string;
        orderNumber: string;
        customerName: string;
        amount: number;
        status: string;
        date: string;
      }>
    >
  > {
    return apiClient.get<
      Array<{
        id: string;
        orderNumber: string;
        customerName: string;
        amount: number;
        status: string;
        date: string;
      }>
    >(`/dashboard/recent-orders?limit=${limit}`);
  }

  async getRevenueByCategory(): Promise<
    ApiResponse<
      Array<{ category: string; revenue: number; percentage: number }>
    >
  > {
    return apiClient.get<
      Array<{ category: string; revenue: number; percentage: number }>
    >("/dashboard/revenue-by-category");
  }

  async getCustomerGrowth(
    period: "day" | "week" | "month" | "year" = "month",
  ): Promise<
    ApiResponse<
      Array<{ date: string; customers: number; newCustomers: number }>
    >
  > {
    return apiClient.get<
      Array<{ date: string; customers: number; newCustomers: number }>
    >(`/dashboard/customer-growth?period=${period}`);
  }

  async getInventoryAlerts(): Promise<
    ApiResponse<
      Array<{
        id: string;
        name: string;
        currentStock: number;
        minStock: number;
        status: "low" | "critical";
      }>
    >
  > {
    return apiClient.get<
      Array<{
        id: string;
        name: string;
        currentStock: number;
        minStock: number;
        status: "low" | "critical";
      }>
    >("/dashboard/inventory-alerts");
  }

  async getOrderStatusDistribution(): Promise<
    ApiResponse<Record<string, number>>
  > {
    return apiClient.get<Record<string, number>>(
      "/dashboard/order-status-distribution",
    );
  }

  async getPaymentMethodStats(): Promise<
    ApiResponse<
      Array<{
        method: string;
        count: number;
        revenue: number;
        percentage: number;
      }>
    >
  > {
    return apiClient.get<
      Array<{
        method: string;
        count: number;
        revenue: number;
        percentage: number;
      }>
    >("/dashboard/payment-method-stats");
  }

  async getTopCustomers(limit: number = 10): Promise<
    ApiResponse<
      Array<{
        id: string;
        name: string;
        email: string;
        totalSpent: number;
        orderCount: number;
        lastOrderDate: string;
      }>
    >
  > {
    return apiClient.get<
      Array<{
        id: string;
        name: string;
        email: string;
        totalSpent: number;
        orderCount: number;
        lastOrderDate: string;
      }>
    >(`/dashboard/top-customers?limit=${limit}`);
  }

  async getConversionMetrics(
    period: "day" | "week" | "month" | "year" = "month",
  ): Promise<
    ApiResponse<{
      totalVisitors: number;
      totalOrders: number;
      conversionRate: number;
      averageOrderValue: number;
      cartAbandonmentRate: number;
    }>
  > {
    return apiClient.get<{
      totalVisitors: number;
      totalOrders: number;
      conversionRate: number;
      averageOrderValue: number;
      cartAbandonmentRate: number;
    }>(`/dashboard/conversion-metrics?period=${period}`);
  }
}

export const dashboardService = new DashboardService();
