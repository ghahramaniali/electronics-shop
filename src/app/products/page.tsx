"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useProductsStore } from "@/store/products-store";
import { sampleProducts } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const {
    setProducts,
    filteredProducts,
    categories,
    setSelectedCategory,
    setSearchQuery,
    setSortBy,
    setSortOrder,
  } = useProductsStore();
  const [selectedCategory, setSelectedCategoryState] = useState("");
  const [searchQuery, setSearchQueryState] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("search") || "";
    }
    return "";
  });
  const [sortBy, setSortByState] = useState("name");
  const [sortOrder, setSortOrderState] = useState("asc");
  const { t } = useLanguage();

  useEffect(() => {
    setProducts(sampleProducts);
  }, [setProducts]);

  useEffect(() => {
    const urlSearchQuery = searchParams.get("search");
    if (urlSearchQuery && urlSearchQuery !== searchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [searchParams, setSearchQuery, searchQuery]);

  useEffect(() => {
    setSelectedCategory(selectedCategory);
  }, [selectedCategory, setSelectedCategory]);

  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery, setSearchQuery]);

  useEffect(() => {
    setSortBy(sortBy as "name" | "price" | "stock");
  }, [sortBy, setSortBy]);

  useEffect(() => {
    setSortOrder(sortOrder as "asc" | "desc");
  }, [sortOrder, setSortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">
          {t("products.title")}
        </h1>
        <p className="text-lg text-secondary">
          Browse our complete collection of electronics boards and components.
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("products.search")}
            value={searchQuery}
            onChange={(e) => setSearchQueryState(e.target.value)}
            className="w-full px-4 py-2 border border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-state-focus bg-surface text-primary"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategoryState(e.target.value)}
          className="px-4 py-2 border border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-state-focus bg-surface text-primary"
        >
          <option value="">{t("products.allCategories")}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortByState(e.target.value)}
          className="px-4 py-2 border border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-state-focus bg-surface text-primary"
        >
          <option value="name">{t("products.sortBy")}</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrderState(e.target.value)}
          className="px-4 py-2 border border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-state-focus bg-surface text-primary"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
