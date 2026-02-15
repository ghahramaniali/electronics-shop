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
    <div className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-light">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-w-16 aspect-h-9 bg-state-hover">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/300x200?text=Product+Image";
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-primary mb-2">
            {product.name}
          </h3>
          <p className="text-secondary text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {product.discount && (
                <span className="text-sm text-muted line-through">
                  ${product.originalPrice?.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              {product.discount && (
                <span className="bg-accent text-inverse text-xs px-2 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>
            <span className="text-sm text-muted">Stock: {product.stock}</span>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-accent text-inverse py-2 px-4 rounded-md hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:bg-state-disabled disabled:text-muted"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
