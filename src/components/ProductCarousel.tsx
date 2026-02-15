'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@/store/cart-store'

interface ProductCarouselProps {
  products: Product[]
  title: string
}

export default function ProductCarousel({ products, title }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-primary">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-surface border border-medium hover:bg-state-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="p-2 rounded-full bg-surface border border-medium hover:bg-state-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-1/4 flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
