"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Eye, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const transactions = [
  {
    id: "#12345",
    customer: "John Doe",
    email: "john@example.com",
    date: "2024-01-15",
    amount: 129.99,
    status: "completed",
    paymentMethod: "Credit Card",
    items: 3,
    products: ["Arduino Uno R3", "LED Kit 5mm", "Breadboard 830 Points"],
  },
  {
    id: "#12346",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2024-01-15",
    amount: 75.99,
    status: "processing",
    paymentMethod: "PayPal",
    items: 1,
    products: ["Raspberry Pi 4 Model B"],
  },
  {
    id: "#12347",
    customer: "Bob Johnson",
    email: "bob@example.com",
    date: "2024-01-14",
    amount: 45.98,
    status: "pending",
    paymentMethod: "Bank Transfer",
    items: 2,
    products: ["ESP32 Dev Board", "DHT22 Temperature Sensor"],
  },
  {
    id: "#12348",
    customer: "Alice Brown",
    email: "alice@example.com",
    date: "2024-01-14",
    amount: 234.99,
    status: "completed",
    paymentMethod: "Credit Card",
    items: 5,
    products: [
      "Arduino Uno R3",
      "Sensor Kit Pro",
      "LED Kit 5mm",
      "Breadboard 830 Points",
      "Jumper Wires",
    ],
  },
  {
    id: "#12349",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    date: "2024-01-13",
    amount: 89.99,
    status: "shipped",
    paymentMethod: "Credit Card",
    items: 2,
    products: ["Raspberry Pi 4 Model B", "Case for RPi 4"],
  },
  {
    id: "#12350",
    customer: "Diana Martinez",
    email: "diana@example.com",
    date: "2024-01-13",
    amount: 156.99,
    status: "cancelled",
    paymentMethod: "PayPal",
    items: 3,
    products: ["Arduino Mega 2560", "Motor Driver Module", "DC Motors"],
  },
];

const statusOptions = [
  "admin.status.allStatus",
  "admin.status.completed",
  "admin.status.processing",
  "admin.status.pending",
  "admin.status.shipped",
  "admin.status.cancelled",
];
const paymentMethods = [
  "admin.payment.allMethods",
  "admin.payment.creditCard",
  "admin.payment.payPal",
  "admin.payment.bankTransfer",
];

const statusMap = {
  "admin.status.allStatus": "All Status",
  "admin.status.completed": "completed",
  "admin.status.processing": "processing",
  "admin.status.pending": "pending",
  "admin.status.shipped": "shipped",
  "admin.status.cancelled": "cancelled",
};

const paymentMap = {
  "admin.payment.allMethods": "All Methods",
  "admin.payment.creditCard": "Credit Card",
  "admin.payment.payPal": "PayPal",
  "admin.payment.bankTransfer": "Bank Transfer",
};

export default function TransactionsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(
    "admin.status.allStatus",
  );
  const [selectedPayment, setSelectedPayment] = useState(
    "admin.payment.allMethods",
  );
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterTransactions(value, selectedStatus, selectedPayment);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    filterTransactions(searchTerm, status, selectedPayment);
  };

  const handlePaymentChange = (method: string) => {
    setSelectedPayment(method);
    filterTransactions(searchTerm, selectedStatus, method);
  };

  const filterTransactions = (
    search: string,
    status: string,
    payment: string,
  ) => {
    let filtered = transactions;

    if (status !== "admin.status.allStatus") {
      filtered = filtered.filter(
        (transaction) =>
          transaction.status === statusMap[status as keyof typeof statusMap],
      );
    }

    if (payment !== "admin.payment.allMethods") {
      filtered = filtered.filter(
        (transaction) =>
          transaction.paymentMethod ===
          paymentMap[payment as keyof typeof paymentMap],
      );
    }

    if (search) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.id.toLowerCase().includes(search.toLowerCase()) ||
          transaction.customer.toLowerCase().includes(search.toLowerCase()) ||
          transaction.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredTransactions(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("admin.transactions.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("admin.transactions.description")}
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>{t("admin.transactions.export")}</span>
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={t("admin.transactions.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue
                  placeholder={t("admin.transactions.filterByStatus")}
                />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPayment} onValueChange={handlePaymentChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue
                  placeholder={t("admin.transactions.paymentMethod")}
                />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {t(method)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>{t("admin.transactions.moreFilters")}</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.transactions.orderId")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.transactions.customer")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.transactions.date")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.transactions.amount")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.transactions.payment")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.transactions.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.transactions.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.id}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.items} {t("admin.transactions.items")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.customer}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}
                    >
                      {t(`admin.status.${transaction.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Package className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing 1 to {filteredTransactions.length} of{" "}
              {filteredTransactions.length} results
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                {t("admin.members.previous")}
              </Button>
              <Button variant="outline" size="sm" disabled>
                {t("admin.members.next")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
