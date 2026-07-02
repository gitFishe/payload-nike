import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductGridItem } from '@/components/ProductGridItem'
import type { Product } from '@/payload-types'
import { ProductsHeader } from '@/components/ProductsHeader'

interface Props {
  items: ReactNode[]
  loading: boolean
  hasNextPage: boolean
  loadMore: () => void
  rootMargin?: string
  emptyMessage?: ReactNode
}

export function InfiniteList({
  items,
  loading,
  hasNextPage,
  loadMore,
  rootMargin = '400px',
  emptyMessage = <p>No items found.</p>,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { rootMargin },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasNextPage, loading, rootMargin]);

  return (
    <div className="flex flex-wrap gap-4">
      {items.length > 0 ? items : emptyMessage}
      <div ref={sentinelRef} className="w-full h-1" />
      {loading && (
        <div className="w-full flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
        </div>
      )}
    </div>
  )
}
