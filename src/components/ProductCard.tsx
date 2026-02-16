"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/store/cart-store";

interface ProductCardProps {
  product: Product & {
    originalPrice?: number;
    discount?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div
      className="
      group relative rounded-2xl overflow-hidden
      bg-gradient-to-br from-surface/90 to-surface/70
      border border-border-light/60
      shadow-lg
      transition-all duration-500
      transform-gpu will-change-transform

      hover:-translate-y-1 hover:shadow-2xl hover:border-accent/40

      before:absolute before:inset-0
      before:bg-gradient-to-br before:from-white/5 before:to-transparent
      before:opacity-0 before:transition-opacity before:duration-500
      hover:before:opacity-100

      backdrop-blur-sm
    "
    >
      <Link href={`/products/${product.id}`}>
        {/* IMAGE AREA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-transparent to-accent/10">
          <img
            src={product.image}
            alt={product.name}
            className="
              w-full h-56 object-cover
              transition-transform duration-700
              group-hover:scale-110
            "
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/300x200?text=Product+Image";
            }}
          />

          {/* shimmer sweep */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-r from-transparent via-white/10 to-transparent
              opacity-0 translate-x-[-100%]
              group-hover:opacity-100 group-hover:translate-x-[100%]
              transition-all duration-1000
            "
          />

          {/* discount badge */}
          {product.discount && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {product.discount && (
                  <span className="text-sm text-text-muted line-through">
                    ${product.originalPrice?.toFixed(2)}
                  </span>
                )}
                <span className="text-2xl font-bold text-text-primary">
                  ${product.price}
                </span>
              </div>

              <span
                className={`text-xs font-medium px-2 py-1 rounded-full inline-block w-fit ${
                  product.stock > 10
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : product.stock > 0
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {product.stock > 10
                  ? "In Stock"
                  : product.stock > 0
                  ? `Only ${product.stock} left`
                  : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* BUTTON */}
      <div className="p-5 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`
          relative w-full py-3.5 px-4 rounded-xl font-semibold
          flex items-center justify-center gap-2 overflow-hidden
          transition-all duration-300 active:scale-[0.98]

          ${
            product.stock === 0
              ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed"
              : `
                bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600
                text-white
                shadow-lg hover:shadow-xl hover:shadow-emerald-500/30
                hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700
              `
          }
          `}
        >
          {product.stock > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          <ShoppingCart className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />

          <span className="relative z-10 tracking-wide">
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </span>
        </button>
      </div>
    </div>
  );
}
