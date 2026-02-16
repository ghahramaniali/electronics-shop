"use client";

import { useEffect } from "react";
import Link from "next/link";
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
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <HeroSection />

      
      <div className="mb-16">
        <ProductCarousel
          products={popularProducts}
          title={t("home.popular") || "Most Popular Products"}
        />
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-surface to-surface/80 border border-light hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:border-accent/30 group">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-accent/25 transition-all duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
            Fast Shipping
          </h3>
          <p className="text-secondary">Free delivery on orders over $50</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-surface to-surface/80 border border-light hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:border-accent/30 group">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-accent/25 transition-all duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
            Quality Guaranteed
          </h3>
          <p className="text-secondary">
            Premium components tested for reliability
          </p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-surface to-surface/80 border border-light hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:border-accent/30 group">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-accent/25 transition-all duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
            Expert Support
          </h3>
          <p className="text-secondary">Technical help for your projects</p>
        </div>
      </div>

     
      <div className="mb-16">
        <ProductCarousel
          products={discountedProducts}
          title={t("home.discounted") || "Special Offers"}
        />
      </div>

   
      <div className="mb-16">
        <ProductCarousel
          products={newArrivals}
          title={t("home.newArrivals") || "New Arrivals"}
        />
      </div>

    
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          {t("home.featured") || "Featured Products"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-2xl p-12 shadow-2xl hover:shadow-accent/25 transition-all duration-300 group">
        <h3 className="text-3xl font-bold mb-4 text-white">
          {t("home.ctaTitle") || "Ready to Start Your Project?"}
        </h3>
        <p className="text-xl mb-8 text-gray-100">
          {t("home.ctaDescription") ||
            "Explore our wide range of electronic components and find everything you need."}
        </p>
        <Link
          href="/products"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 border border-blue-500/30 shadow-lg"
        >
          {t("home.viewAll") || "View All Products"}
        </Link>
      </div>
    </div>
  );
}
