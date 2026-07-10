'use client'

import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import type { Cart } from '@/payload-types'
import { CartMinus } from '@/components/icons/CartMinus'
import { CartDelete } from '@/components/icons/CartDelete'
import { CartPlus } from '@/components/icons/CartPlus'
import { CartFavourite } from '@/components/icons/cartFavourite'

type CartLineItem = NonNullable<Cart['items']>[number]

export default function CartItem({ item }: { item: CartLineItem }) {
  const { incrementItem, decrementItem, removeItem, isLoading } = useCart()
  const maxCount = 10

  const product = typeof item.product === 'object' && item.product ? item.product : null
  const lineId = item.id
  const qty = item.quantity
  
  if (!product) return null

  const handleDecrement = () => {
    if (!lineId) return
    if (qty <= 1) void removeItem(lineId)
    else void decrementItem(lineId)
  }

  return (
    <div className="py-6 border-b border-[#e5e5e5]">
      <div className="flex">
        <div className="w-41 h-41 shrink-0 mr-4">
          {product.imageUrl && (
            <img className="h-full w-full object-cover" src={product.imageUrl} alt={product.title ?? ''} />
          )}
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="hover:text-secondary cursor-pointer">{product.title}</h2>
            <span>${product.currentPrice}</span>
          </div>
          {product.subTitle && (
            <div>
              <span className="text-secondary">{product.subTitle}</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex relative z-10">
        <div className="border-[#e5e5e5] border w-fit rounded-full overflow-hidden flex items-center bg-white">
          <button
            className="h-10 w-10 p-2 rounded-full cursor-pointer hover:bg-gray-200 disabled:opacity-50"
            disabled={isLoading || !lineId}
            onClick={handleDecrement}
          >
            {qty <= 1 ? <CartDelete /> : <CartMinus />}
          </button>
          <span className="text-center w-6">{qty}</span>
          <button
            disabled={qty >= maxCount || isLoading || !lineId}
            className={`h-10 w-10 p-2 rounded-full group ${qty < maxCount ? 'cursor-pointer hover:bg-gray-200' : ''}`}
            onClick={() => lineId && void incrementItem(lineId)}
          >
            <CartPlus styles="group-disabled:opacity-50" />
          </button>
        </div>
        <button className="rounded-full border-[#e5e5e5] border w-10 h-10 flex items-center justify-center ml-2 cursor-pointer hover:bg-gray-200">
          <CartFavourite />
        </button>
      </div>
    </div>
  )
}