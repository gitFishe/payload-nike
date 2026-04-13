'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const BackLink = ({link}: {link:string}) => {

  const router = useRouter()

  const onClick = () => {
    if(window.history.length > 1 ) router.back()
    else router.push(`/${link}`)
  }
  return (
    <button
      onClick={() => {
        onClick()
      }}
      className="text-gray-500 hover:text-black mb-8 inline-block"
    >
      <span>← Всі товари</span>
    </button>
  )
}