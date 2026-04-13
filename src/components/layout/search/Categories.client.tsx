'use client'
import React, { useCallback, useMemo } from 'react'

import { Category } from '@/payload-types'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'

type Props = {
  category: string
}

export const CategoryItem: React.FC<Props> = ({ category }) => {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = useMemo(() => {
    return searchParams.get('category') === category
  }, [category, searchParams])

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('category')
    } else {
      params.set('category', category)
    }

    const newParams = params.toString()

    router.push(pathname + '?' + newParams)
  }, [category, isActive, pathname, router, searchParams])

  return (
    <button
      onClick={() => setQuery()}
      className={clsx('hover:cursor-pointer py-1.25 font-medium', {
        ' underline': isActive,
      })}
    >
      {category}
    </button>
  )
}
