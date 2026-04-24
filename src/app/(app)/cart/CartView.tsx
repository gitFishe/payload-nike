'use client'

import CartItem from '@/components/CartItem'
import { useCart } from '@/providers/Cart'
import { SummaryArrow } from '@/components/icons/SummaryArrow'
import { useState } from 'react'

export default function CartView() {
  const {items,totalPrice,totalCount,clear} = useCart()

  const [open, setOpen] = useState(false)


  return (
    <div className="flex pt-14">
      <div className="w-full mr-4">
        <h1 className="text-2xl">Bag</h1>
        <div>
          {items.length > 0 ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className="pl-1">There are no items in your bag.</p>
          )}
        </div>
      </div>
      <aside className="max-w-1/3 w-full">
        <h2 className="text-2xl mb-6">Summary</h2>
        <div className="">
          <div className="group">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex justify-between [&::-webkit-details-marker]:hidden cursor-pointer w-full"
            >
              <div className='flex justify-between w-full'>
                <span className='font-semibold'>Do you have promo card?</span>
                <div className="group-open:rotate-180 transition-transform">
                  <SummaryArrow styles={``} />
                </div>
              </div>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <div className="flex items-center pb-7.5 pt-0.5">
                  <input className="mr-2 border border-primary rounded-[8px] w-full  px-4 py-2 h-9.25"/>
                  <button className="border border-primary rounded-full px-6 py-2 cursor-pointer hover:border-[#cccccc] transition-border duration-400">
                    <span>Apply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="py-3.5 [&>*:not(:last-child)]:pb-3">
              <TableRow text="Subtotal" />
              <TableRow text="Estimated Shipping & Handling" />
              <TableRow text="Estimated Tax" />
            </div>
            <div className="py-3.5 border-y border-[#e5e5e5]">
              <TableRow text="Total" />
            </div>
          </div>
          <div className="pt-3">
            <p>Add $50.00 more to earn Free Shipping!</p>
            <div className="flex items-center">
              <div className="h-2 w-full mr-2 rounded-[4px] bg-secondary"></div>
              <span>$50</span>
            </div>
          </div>
        </div>
        <button className="bg-black h-15 w-full rounded-full flex items-center justify-center text-white mt-5 cursor-pointer">
          <span>Checkout</span>
        </button>
      </aside>
    </div>
  )
}

type TableRowProps = {
  text:string,
  rowEnd?:string | 'Free',
  mark?:boolean,
  markText?:string
}

function TableRow({
  text,
  mark,
  markText,
  rowEnd = '-'
}: TableRowProps) {

  return (
    <div className='flex justify-between'>
      <div className="flex">
        <span>{text}</span>
        {mark && (
          <div className="ml-1 mr-full">
            <button className="w-3.5 h-4.5">
              <img src="/icon/cart-question-mark.svg" />
            </button>
            <div>
              <p>{markText}</p>
            </div>
          </div>
        )}
      </div>
      <div>
        <span>{rowEnd}</span>
      </div>
    </div>
  )
}