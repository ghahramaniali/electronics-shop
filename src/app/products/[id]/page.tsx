"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useProductsStore } from "@/store/products-store";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleProducts } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCartStore();
  const { setProducts } = useProductsStore();
  const { t } = useLanguage();
  const product = params.id
    ? sampleProducts.find((p) => p.id === params.id) || null
    : null;

  useEffect(() => {
    setProducts(sampleProducts);
  }, [setProducts]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t("product.notFound")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("product.notFoundDescription")}
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            {t("product.backToProducts")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          {t("nav.home")}
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href="/products" className="text-gray-500 hover:text-gray-700">
          {t("nav.products")}
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "/file.svg";
            }}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="ml-4 text-sm text-gray-500">
              {t("product.stock").replace("{count}", product.stock.toString())}
            </span>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-8"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-5 w-5" />
            {product.stock === 0
              ? t("product.outOfStock")
              : t("product.addToCart")}
          </button>

          {product.specs && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("product.specifications")}
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                    >
                      <dt className="font-medium text-gray-900">{key}</dt>
                      <dd className="text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
