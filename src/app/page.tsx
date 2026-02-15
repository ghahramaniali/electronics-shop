"use client";

import { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import HeroSection from "@/components/HeroSection";
import { useProductsStore } from "@/store/products-store";
import { sampleProducts } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { setProducts, filteredProducts } = useProductsStore();
  const { t } = useLanguage();

  useEffect(() => {
    setProducts(sampleProducts);
  }, [setProducts]);

  // Filter products for different carousels
  const popularProducts = sampleProducts
    .filter((p) => p.stock > 10)
    .slice(0, 8);
  const discountedProducts = sampleProducts
    .map((p) => ({
      ...p,
      originalPrice: p.price * 1.3,
      discount: 30,
    }))
    .slice(0, 8);
  const newArrivals = sampleProducts.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Popular Products Carousel */}
      <ProductCarousel
        products={popularProducts}
        title={t("home.popular") || "Most Popular Products"}
      />

      {/* Discounted Products Carousel */}
      <ProductCarousel
        products={discountedProducts}
        title={t("home.discounted") || "Special Offers"}
      />

      {/* New Arrivals Carousel */}
      <ProductCarousel
        products={newArrivals}
        title={t("home.newArrivals") || "New Arrivals"}
      />

      {/* Featured Products Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          {t("home.featured")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-surface rounded-lg p-8 border border-medium">
        <h3 className="text-2xl font-bold text-primary mb-4">
          {t("home.ctaTitle") || "Ready to Start Your Project?"}
        </h3>
        <p className="text-secondary mb-6">
          {t("home.ctaDescription") ||
            "Explore our wide range of electronic components and find everything you need."}
        </p>
        <a
          href="/products"
          className="inline-block bg-accent text-inverse px-8 py-3 rounded-md hover:bg-primary transition-colors font-semibold"
        >
          {t("home.viewAll")}
        </a>
      </div>
    </div>
  );
}
