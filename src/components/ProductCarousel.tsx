"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import AnimatedSection from "./AnimatedSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/store/cart-store";

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export default function ProductCarousel({
  products,
  title,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <AnimatedSection animation="fade-up" className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-primary">{title}</h2>
        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-gradient-to-br from-surface to-surface/80 border border-light hover:from-accent/20 hover:to-accent/10 hover:border-accent/40 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="p-3 rounded-full bg-gradient-to-br from-surface to-surface/80 border border-light hover:from-accent/20 hover:to-accent/10 hover:border-accent/40 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl">
        <div
          className="flex py-4 transition-transform duration-500 ease-in-out gap-8"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="w-1/4 flex-shrink-0"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
