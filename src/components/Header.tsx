"use client";

import Link from "next/link";
import { ShoppingCart, Sun, Moon, Globe } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { getTotalItems } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const totalItems = getTotalItems();

  return (
    <header className="bg-background border-b border-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            {t("shop.title")}
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-secondary hover:text-primary">
              {t("nav.home")}
            </Link>
            <Link
              href="/products"
              className="text-secondary hover:text-primary"
            >
              {t("nav.products")}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 text-secondary hover:text-primary flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language.toUpperCase()}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-secondary hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            <Link
              href="/cart"
              className="relative p-2 text-secondary hover:text-primary"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-inverse text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
