"use client";

import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  {
    title: "admin.totalRevenue",
    value: "$45,231",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "admin.totalProducts",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: Package,
  },
  {
    title: "admin.totalOrders",
    value: "8,549",
    change: "-2.4%",
    trend: "down",
    icon: ShoppingCart,
  },
  {
    title: "admin.totalCustomers",
    value: "2,456",
    change: "+18.2%",
    trend: "up",
    icon: Users,
  },
];

const recentOrders = [
  {
    id: "#12345",
    customer: "John Doe",
    product: "Arduino Uno",
    amount: "$29.99",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "#12346",
    customer: "Jane Smith",
    product: "Raspberry Pi 4",
    amount: "$75.99",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "#12347",
    customer: "Bob Johnson",
    product: "ESP32 Dev Board",
    amount: "$12.99",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "#12348",
    customer: "Alice Brown",
    product: "Sensor Kit",
    amount: "$45.99",
    status: "completed",
    date: "2024-01-14",
  },
];

const topProducts = [
  {
    name: "Arduino Uno R3",
    sales: 234,
    revenue: "$7,016",
  },
  {
    name: "Raspberry Pi 4",
    sales: 156,
    revenue: "$11,854",
  },
  {
    name: "ESP32 Dev Board",
    sales: 189,
    revenue: "$2,455",
  },
  {
    name: "Sensor Kit Pro",
    sales: 98,
    revenue: "$4,506",
  },
];

export default function AdminDashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t("admin.title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t("admin.welcome")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t(stat.title)}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendIcon
                  className={`w-4 h-4 mr-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                />
                <span
                  className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {t("admin.fromLastMonth")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("admin.recentOrders")}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {order.customer}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {order.product}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.amount}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : order.status === "processing"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {t(`admin.status.${order.status}`)}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {order.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("admin.topProducts")}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {product.sales} {t("admin.sales")}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
