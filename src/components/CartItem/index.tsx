'use client'

import { useEffect, useState } from 'react'
import {useCart} from '@/providers/Cart'
import { CartMinus } from '@/components/icons/CartMinus'
import { CartDelete } from '@/components/icons/CartDelete'
import { CartPlus } from '@/components/icons/CartPlus'
import { CartFavourite } from '@/components/icons/cartFavourite'
import { CrossIcon } from '@/components/icons/CrossIcon'
import { CartPopup } from '@/components/CustomPopup/CartPopup'

export type CartItemType = {
  title: string
  price: number
  imageUrl?: string
  id:number,
  qty:number,
  size?:number,
}

export default function CartItem({ item }: { item: CartItemType }) {
  const {updateQty, updateSize} = useCart()
  const maxCount = 10

  const [isShown, setIsShown] = useState(false)

  const popupHandler = () => {
    document.body.style.overflow = isShown ? '' : 'hidden'
    setIsShown((v) => !v)
  }

  return (
    <div className="py-6 border-b border-[#e5e5e5]">
      <div className="flex">
        <div className="w-41 h-41 shrink-0 mr-4">
          <img className="h-full w-full object-cover" src={item.imageUrl} />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="hover:text-secondary cursor-pointer">{item.title}</h2>
            <span>${item.price}</span>
          </div>
          <div>
            <span>blablabla</span>
          </div>
          <div>
            <span>black</span>
            <span>name</span>
          </div>
          <div className="relative">
            <button
              className="underline underline-offset-2 cursor-pointer relative z-20"
              onClick={popupHandler}
            >
              {item.size ?? 'M'}
            </button>
            <div className="absolute -bottom-4 left-15">
              <img src="/media/cart-arrow-1.gif" />
            </div>
            <div className="absolute top-2.5 -left-12">
              <img src="/media/cart-arrow-2.gif" />
            </div>
            <div className="absolute -top-25 -left-12">
              <img src="/media/cart-arrow-3.gif" />
            </div>
            <div className="absolute -top-7 -left-[231px] rotate-[327deg] ">
              <img src="/media/cart-arrow-4.gif" />
            </div>
            <div className="absolute -top-25 -left-[109px] rotate-[60deg] h-12">
              <img className='h-full' src="/media/cart-arrow-5.gif" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex relative z-10">
        <div className="border-[#e5e5e5] border w-fit rounded-full overflow-hidden flex items-center bg-white">
          <button
            className="h-10 w-10 p-2 rounded-full cursor-pointer hover:bg-gray-200"
            onClick={() => updateQty(item.id, item.qty - 1)}
          >
            {item.qty <= 1 ? <CartDelete /> : <CartMinus />}
          </button>
          <span className="text-center w-6">{item.qty}</span>
          <button
            disabled={item.qty >= maxCount}
            className={`h-10 w-10 p-2 rounded-full group ${item.qty < maxCount ? 'cursor-pointer hover:bg-gray-200' : ''}`}
            onClick={() => updateQty(item.id, item.qty + 1)}
          >
            <CartPlus styles="group-disabled:opacity-50" />
          </button>
        </div>
        <button className="rounded-full border-[#e5e5e5] border w-10 h-10 flex items-center justify-center ml-2 cursor-pointer hover:bg-gray-200">
          <CartFavourite />
        </button>
      </div>
      <CartPopup
        isShown={isShown}
        onClose={() => setIsShown(false)}
        item={item}
        onUpdate={(size) => updateSize(item.id, size)}
      />
    </div>
  )
}