'use client'

import React from 'react'

import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { toast } from 'sonner'
import type { Product } from '@/payload-types'

export const AddToCart = ({ product }: { product: Product }) => {
  const { addItem, isLoading } = useCart()

  const handleClick = async () => {
    try {
      // size is only a catalog filter here, not a purchasable variant,
      // so we add the product without a variant.
      await addItem({ product: product.id }, 1)
      toast.success('Додано в кошик')
    } catch (e) {
      console.error(e)
      toast.error('Не вдалося додати товар у кошик')
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="bg-black text-white py-4 px-8 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
    >
      Додати в кошик
    </button>
  )
}