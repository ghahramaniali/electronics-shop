"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "fa";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.cart": "Cart",
    "shop.title": "Electronics Shop",
    "home.welcome": "Welcome to Electronics Shop",
    "home.description":
      "Discover our wide range of electronics boards and components for your next project.",
    "home.featured": "Featured Products",
    "home.popular": "Most Popular Products",
    "home.discounted": "Special Offers",
    "home.newArrivals": "New Arrivals",
    "home.ctaTitle": "Ready to Start Your Project?",
    "home.ctaDescription":
      "Explore our wide range of electronic components and find everything you need.",
    "home.viewAll": "View All Products",
    "products.title": "Products",
    "products.search": "Search products...",
    "products.allCategories": "All Categories",
    "products.sortBy": "Sort by",
    "products.nameAsc": "Name (A-Z)",
    "products.nameDesc": "Name (Z-A)",
    "products.priceAsc": "Price (Low to High)",
    "products.priceDesc": "Price (High to Low)",
    "products.noResults": "No products found matching your criteria.",
    "products.addToCart": "Add to Cart",
    "product.addToCart": "Add to Cart",
    "product.inStock": "In Stock",
    "product.outOfStock": "Out of Stock",
    "product.description": "Description",
    "product.specifications": "Specifications",
    "product.price": "Price",
    "product.category": "Category",
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty.",
    "cart.product": "Product",
    "cart.price": "Price",
    "cart.quantity": "Quantity",
    "cart.total": "Total",
    "cart.remove": "Remove",
    "cart.update": "Update",
    "cart.checkout": "Checkout",
    "cart.subtotal": "Subtotal",
    "cart.tax": "Tax",
    "cart.shipping": "Shipping",
    "cart.orderTotal": "Order Total",
  },
  fa: {
    "nav.home": "صفحه اصلی",
    "nav.products": "محصولات",
    "nav.cart": "سبد خرید",
    "shop.title": "فروشگاه الکترونیک",
    "home.welcome": "به فروشگاه الکترونیک خوش آمدید",
    "home.description":
      "مجموعه گسترده ما از بردها و قطعات الکترونیکی را برای پروژه بعدی خود کشف کنید.",
    "home.featured": "محصولات ویژه",
    "home.popular": "محبوب‌ترین محصولات",
    "home.discounted": "پیشنهادات ویژه",
    "home.newArrivals": "محصولات جدید",
    "home.ctaTitle": "آماده شروع پروژه خود هستید؟",
    "home.ctaDescription":
      "مجموعه گسترده ما از قطعات الکترونیکی را کاوش کنید و همه چیز مورد نیاز خود را پیدا کنید.",
    "home.viewAll": "مشاهده همه محصولات",
    "products.title": "محصولات",
    "products.search": "جستجوی محصولات...",
    "products.allCategories": "همه دسته‌بندی‌ها",
    "products.sortBy": "مرتب‌سازی بر اساس",
    "products.nameAsc": "نام (الف-ی)",
    "products.nameDesc": "نام (ی-الف)",
    "products.priceAsc": "قیمت (کم به زیاد)",
    "products.priceDesc": "قیمت (زیاد به کم)",
    "products.noResults": "محصولی با معیارهای شما یافت نشد.",
    "products.addToCart": "افزودن به سبد",
    "product.addToCart": "افزودن به سبد",
    "product.inStock": "موجود در انبار",
    "product.outOfStock": "ناموجود در انبار",
    "product.description": "توضیحات",
    "product.specifications": "مشخصات",
    "product.price": "قیمت",
    "product.category": "دسته‌بندی",
    "cart.title": "سبد خرید",
    "cart.empty": "سبد خرید شما خالی است.",
    "cart.product": "محصول",
    "cart.price": "قیمت",
    "cart.quantity": "تعداد",
    "cart.total": "مجموع",
    "cart.remove": "حذف",
    "cart.update": "به‌روزرسانی",
    "cart.checkout": "پرداخت",
    "cart.subtotal": "جمع جزء",
    "cart.tax": "مالیات",
    "cart.shipping": "حمل و نقل",
    "cart.orderTotal": "مجموع سفارش",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fa")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "fa" : "en"));
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
