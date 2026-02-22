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
import { Search, Filter, Edit, Trash2, Eye, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const products = [
  {
    id: 1,
    name: "Arduino Uno R3",
    sku: "ARDU-UNO-R3",
    category: "Microcontrollers",
    price: 29.99,
    stock: 145,
    status: "active",
    image: "/api/placeholder/60/60",
  },
  {
    id: 2,
    name: "Raspberry Pi 4 Model B",
    sku: "RPI-4B-4GB",
    category: "Development Boards",
    price: 75.99,
    stock: 89,
    status: "active",
    image: "/api/placeholder/60/60",
  },
  {
    id: 3,
    name: "ESP32 Dev Board",
    sku: "ESP32-DEV",
    category: "Microcontrollers",
    price: 12.99,
    stock: 234,
    status: "active",
    image: "/api/placeholder/60/60",
  },
  {
    id: 4,
    name: "DHT22 Temperature Sensor",
    sku: "DHT22-SENSOR",
    category: "Sensors",
    price: 8.99,
    stock: 0,
    status: "out-of-stock",
    image: "/api/placeholder/60/60",
  },
  {
    id: 5,
    name: "LED Kit 5mm",
    sku: "LED-KIT-5MM",
    category: "Components",
    price: 4.99,
    stock: 567,
    status: "active",
    image: "/api/placeholder/60/60",
  },
  {
    id: 6,
    name: "Breadboard 830 Points",
    sku: "BB-830",
    category: "Tools",
    price: 6.99,
    stock: 123,
    status: "active",
    image: "/api/placeholder/60/60",
  },
];

const categories = [
  "admin.categories.all",
  "admin.categories.microcontrollers",
  "admin.categories.sensors",
  "admin.categories.developmentBoards",
  "admin.categories.components",
  "admin.categories.kits",
  "admin.categories.tools",
  "admin.categories.accessories",
];

const categoryMap = {
  "admin.categories.all": "All Categories",
  "admin.categories.microcontrollers": "Microcontrollers",
  "admin.categories.sensors": "Sensors",
  "admin.categories.developmentBoards": "Development Boards",
  "admin.categories.components": "Components",
  "admin.categories.kits": "Kits",
  "admin.categories.tools": "Tools",
  "admin.categories.accessories": "Accessories",
};

export default function ProductsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "admin.categories.all",
  );
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterProducts(value, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (search: string, category: string) => {
    let filtered = products;

    if (category !== "admin.categories.all") {
      filtered = filtered.filter(
        (product) =>
          product.category ===
          categoryMap[category as keyof typeof categoryMap],
      );
    }

    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.sku.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredProducts(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "out-of-stock":
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
              {t("admin.products.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("admin.products.description")}
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>{t("admin.products.addProduct")}</span>
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={t("admin.products.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t("admin.products.selectCategory")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {t(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>{t("admin.products.filters")}</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.products.product")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.products.sku")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.products.category")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.products.price")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.products.stock")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.products.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.products.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}
                    >
                      {t(`admin.status.${product.status.replace("-", "")}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
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
              Showing 1 to {filteredProducts.length} of{" "}
              {filteredProducts.length} results
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
