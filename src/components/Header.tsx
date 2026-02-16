"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Sun, Moon, Globe, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function Header() {
  const { getTotalItems } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const totalItems = getTotalItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(
        searchQuery.trim(),
      )}`;
    }
  };

  return (
    <header className="bg-background border-b border-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            {t("shop.title")}
          </Link>

          {pathname !== "/products" && (
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center bg-background border border-medium rounded-lg px-3 py-2"
            >
              <input
                type="text"
                placeholder={t("nav.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-secondary placeholder:text-muted-foreground w-48 lg:w-64"
              />
              <button
                type="submit"
                className="ml-2 text-secondary hover:text-primary"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          )}

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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-secondary hover:text-primary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

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

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-medium py-4">
            {pathname !== "/products" && (
              <form onSubmit={handleSearch} className="px-4 mb-4">
                <div className="flex items-center bg-background border border-medium rounded-lg px-3 py-2">
                  <input
                    type="text"
                    placeholder={t("nav.search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-secondary placeholder:text-muted-foreground flex-1"
                  />
                  <button
                    type="submit"
                    className="ml-2 text-secondary hover:text-primary"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            <nav className="flex flex-col space-y-3 px-4">
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
          </div>
        )}
      </div>
    </header>
  );
}
