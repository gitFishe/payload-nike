'use client'

import React from 'react'

export const AddToCart = ({ CartHandler }: { CartHandler: Function }) => {
  return (
    <button
      onClick={() => CartHandler()}
      className="bg-black text-white py-4 px-8 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors"
    >
      Додати в кошик
    </button>
  )
}