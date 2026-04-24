'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type CartItem = {
  id: number
  title: string
  price: number
  imageUrl: string
  qty: number
  size?:number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clear: () => void
  totalPrice: number
  totalCount: number
  updateSize:(id:number,size:number) => void
}



const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if(saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('error in localStorage',e)
        localStorage.removeItem('cart')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(items))
  },[items])


  const addItem = (item:Omit<CartItem, 'qty'>)=> {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if(existing) {
        return prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i)
      }
      return [...prev, {...item, qty: 1}]
    })
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const MAX_QTY = 10

  const updateQty = (id: number, qty: number ) => {
    if(qty <= 0) {
      removeItem(id)
      return
    }
    if(MAX_QTY < qty) qty = MAX_QTY
    setItems(prev => prev.map(i => i.id === id ? {...i,qty} : i))
  }


  const updateSize = (id:number, size:number) => {
    setItems(prev => prev.map(i => i.id === id ? {...i, size} : i))
  }

  const clear = () => setItems([])


  const value: CartContextType = {
    items,
    addItem, removeItem, updateQty, clear, updateSize,
    totalPrice: items.reduce((sum,i) => sum + i.price * i.qty, 0),
    totalCount: items.reduce((sum,i) => sum + i.qty, 0),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart myst be used within CartProvider')
  return ctx
}