'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  children: React.ReactNode[]
  title: string
}

export default function Carousel({ children, title }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length)
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-primary">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-surface border border-medium hover:bg-state-hover transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-surface border border-medium hover:bg-state-hover transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-accent' : 'bg-state-hover'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
