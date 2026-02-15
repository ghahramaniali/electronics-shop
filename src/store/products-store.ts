import { create } from 'zustand'
import { Product } from './cart-store'

interface ProductsStore {
  products: Product[]
  filteredProducts: Product[]
  categories: string[]
  selectedCategory: string
  searchQuery: string
  sortBy: 'name' | 'price' | 'stock'
  sortOrder: 'asc' | 'desc'
  
  setProducts: (products: Product[]) => void
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: 'name' | 'price' | 'stock') => void
  setSortOrder: (order: 'asc' | 'desc') => void
  filterAndSortProducts: () => void
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: '',
  searchQuery: '',
  sortBy: 'name',
  sortOrder: 'asc',
  
  setProducts: (products: Product[]) => {
    const categories = Array.from(new Set(products.map(p => p.category)))
    set({ 
      products, 
      categories,
      filteredProducts: products 
    })
  },
  
  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category })
    get().filterAndSortProducts()
  },
  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
    get().filterAndSortProducts()
  },
  
  setSortBy: (sortBy: 'name' | 'price' | 'stock') => {
    set({ sortBy })
    get().filterAndSortProducts()
  },
  
  setSortOrder: (order: 'asc' | 'desc') => {
    set({ sortOrder: order })
    get().filterAndSortProducts()
  },
  
  filterAndSortProducts: () => {
    const { products, selectedCategory, searchQuery, sortBy, sortOrder } = get()
    
    let filtered = products
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.nameFa.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.descriptionFa.toLowerCase().includes(query)
      )
    }
    
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'price':
          comparison = a.price - b.price
          break
        case 'stock':
          comparison = a.stock - b.stock
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })
    
    set({ filteredProducts: filtered })
  }
}))
