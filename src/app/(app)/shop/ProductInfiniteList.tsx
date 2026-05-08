'use client'

import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { InfiniteList } from './InfiniteList'
import { ProductGridItem } from '@/components/ProductGridItem'
import type { Product } from '@/payload-types'

type Props = {
  initialDocs: Product[]
  initialHasNextPage: boolean
}

type LoadMoreResponse = { // Rename
  docs: Product[]
  page: number
  hasNextPage: boolean
}

export const ProductInfiniteList = ({ initialDocs, initialHasNextPage }: Props) => {
  const searchParams = useSearchParams()

  const [docs, setDocs] = useState<Product[]>(initialDocs)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    if (loading || !hasNextPage) return
    setLoading(true)

    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(page + 1))

      const res = await fetch(`/shop/api?${params.toString()}`)
      if (!res.ok) throw new Error(`Failed to load products: ${res.status}`)

      const data = (await res.json()) as LoadMoreResponse

      setDocs((prev) => [...prev, ...data.docs])
      setPage(data.page)
      setHasNextPage(data.hasNextPage)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [loading, hasNextPage, page, searchParams])

  return (
    <InfiniteList
      items={docs.map((p) => <ProductGridItem key={p.id} product={p} />)}
      loading={loading}
      hasNextPage={hasNextPage}
      loadMore={loadMore}
      emptyMessage={<p>No products found.</p>}
    />
  )
}
