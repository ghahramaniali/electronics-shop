'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  image: string
  cta: string
  link: string
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Electronics Innovation",
    subtitle: "Discover cutting-edge boards and components for your next project",
    image: "https://via.placeholder.com/1200x400/2b6777/ffffff?text=Electronics+Shop",
    cta: "Shop Now",
    link: "/products"
  },
  {
    id: 2,
    title: "Arduino & Raspberry Pi",
    subtitle: "Everything you need for IoT and embedded systems",
    image: "https://via.placeholder.com/1200x400/52ab98/ffffff?text=Arduino+%26+Raspberry+Pi",
    cta: "Explore",
    link: "/products?category=Arduino"
  },
  {
    id: 3,
    title: "Special Offers",
    subtitle: "Get up to 30% off on selected items",
    image: "https://via.placeholder.com/1200x400/0891b2/ffffff?text=Special+Offers",
    cta: "View Deals",
    link: "/products?discount=true"
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg mb-12">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/1200x400/64748b/ffffff?text=Hero+Image'
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
                <a
                  href={slide.link}
                  className="inline-block bg-accent text-inverse px-8 py-3 rounded-md hover:bg-primary transition-colors font-semibold"
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
