'use client'

import React, { useState } from 'react'
import { AnimatedArrow } from '@/components/icons/AnimatedArrow'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const SORT_OPTIONS = [
  { label: 'Featured', value: null },
  { label: 'Newest', value: 'id' },
  { label: 'Price: High-Low', value: '-currentPrice' },
  { label: 'Price: Low-High', value: 'currentPrice' },
]

export const ProductsHeader = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filterOpened, setFilterOpened] = useState(false)
  const [sortLabel, setSortLabel] = useState<string | null>(null)

  const applySort = (value: string | null, label: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set('sort', value)
    else params.delete('sort')
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    setSortLabel(label)
    setFilterOpened(false)
  }

  return (
    <div className="flex justify-between mb-7.5">
      <h2>Test header</h2>
      <div>
        <div className="relative">
          <div
            onClick={() => setFilterOpened(!filterOpened)}
            className="cursor-pointer flex items-center"
          >
            <span>
              Sort By
              {sortLabel && <span className="text-secondary">: {sortLabel}</span>}
            </span>
            <AnimatedArrow expanded={filterOpened} addClasses="ml-2 relative" />
          </div>
          <ul
            className={`absolute w-42.5 right-0 flex-col z-50 top-full bg-white rounded-bl-[20px] pr-7 pt-6 pb-4 *:cursor-pointer *:hover:text-secondary *:w-full text-end font-medium ${filterOpened ? 'flex' : 'hidden'}`}
          >
            {SORT_OPTIONS.map((e, i) => (
              <li onClick={() => applySort(e.value, e.label)} key={i}>
                <span>{e.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}