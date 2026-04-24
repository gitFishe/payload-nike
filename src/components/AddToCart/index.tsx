'use client'

import React from 'react'

import {useCart} from '@/providers/Cart'
import type {Product} from '@/payload-types'

export const AddToCart = ({ product }: { product: Product }) => {
  const {addItem} = useCart()


  const handleClick = () => {
    addItem({
      id:product.id,
      title: product.title,
      price: product.currentPrice,
      imageUrl: product.imageUrl ?? '',
    })
  }

  return (
    <button
      onClick={handleClick}
      className="bg-black text-white py-4 px-8 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors"
    >
      Додати в кошик
    </button>
  )
}