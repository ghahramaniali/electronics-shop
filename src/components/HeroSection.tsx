"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Electronics Innovation",
    subtitle:
      "Discover cutting-edge boards and components for your next project",
    image:
      "https://via.placeholder.com/1200x400/2b6777/ffffff?text=Electronics+Shop",
    cta: "Shop Now",
    link: "/products",
  },
  {
    id: 2,
    title: "Arduino & Raspberry Pi",
    subtitle: "Everything you need for IoT and embedded systems",
    image:
      "https://via.placeholder.com/1200x400/52ab98/ffffff?text=Arduino+%26+Raspberry+Pi",
    cta: "Explore",
    link: "/products?category=Arduino",
  },
  {
    id: 3,
    title: "Special Offers",
    subtitle: "Get up to 30% off on selected items",
    image:
      "https://via.placeholder.com/1200x400/0891b2/ffffff?text=Special+Offers",
    cta: "View Deals",
    link: "/products?discount=true",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl mb-16 shadow-2xl">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative group">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/1200x500/64748b/ffffff?text=Hero+Image";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 flex items-center justify-start group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50 transition-all duration-700">
              <div className="text-left text-white px-8 md:px-16 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-delayed">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.link}
                  className="inline-block bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 animate-fade-in-delayed"
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white hover:from-white/30 hover:to-white/20 transition-all duration-300 hover:shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white hover:from-white/30 hover:to-white/20 transition-all duration-300 hover:shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
