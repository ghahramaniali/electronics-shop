"use client";

import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } =
    useCartStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">
            {t("cart.title")}
          </h1>
          <div className="bg-surface rounded-lg p-8 mb-8">
            <p className="text-secondary mb-8">{t("cart.empty")}</p>
            <Link
              href="/products"
              className="inline-block bg-accent text-inverse px-6 py-3 rounded-md hover:bg-primary transition-colors"
            >
              {t("cart.continue")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">
        {t("cart.title")}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-surface rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-medium">
              <h2 className="text-lg font-semibold text-primary">
                {t("cart.items")} ({totalItems})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/80x80?text=Product";
                      }}
                    />

                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-secondary">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 text-muted hover:text-secondary"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="w-12 text-center">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 text-muted hover:text-secondary"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted hover:text-secondary"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
              {t("cart.checkout")}
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-secondary">{t("cart.subtotal")}</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">{t("cart.shipping")}</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">{t("cart.tax")}</span>
                <span className="font-medium">
                  ${(totalPrice * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">
                    ${(totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors mb-4">
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="block w-full text-center text-blue-600 hover:text-blue-700 py-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
