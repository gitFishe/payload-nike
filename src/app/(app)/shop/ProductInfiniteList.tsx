'use client'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductGridItem } from '@/components/ProductGridItem'
import type { Product } from '@/payload-types'

type Props = {
  initialDocs: Product[]
  initialTotalPages: number
  initialHasNextPage: boolean
}

export const ProductInfiniteList = ({ initialDocs, initialTotalPages, initialHasNextPage }: Props) => {

  const searchParams = useSearchParams()
  const currentParams = searchParams.toString()

  const [products, setProducts] = useState<Product[]>(initialDocs)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [scrollY, setScrollY] = useState(0)

  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const prevParamsRef = useRef(currentParams)

  useLayoutEffect(() => {
      if(scrollY) {
        window.scrollTo(0, scrollY)
        setScrollY(0)
      }
    },[products,scrollY])

  // Скид стану при зміні фільтрів
  useEffect(() => {
    if (prevParamsRef.current !== currentParams) {
      prevParamsRef.current = currentParams
      setProducts(initialDocs)
      setPage(1)
      setHasNextPage(initialHasNextPage)
      sessionStorage.removeItem('shop-scroll')
    }
  }, [currentParams, initialDocs, initialHasNextPage])

  useEffect(() => {
    const savedState = sessionStorage.getItem('shop-scroll')
    if(!savedState) return;

    try {
      const state = JSON.parse(savedState)


      // Фільтруємо дублікати по id
      const seen = new Set<number>()
      const uniqueProducts = state.products.filter((p: Product) => {
        if (seen.has(p.id)) return false
        seen.add(p.id)
        return true
      })


      setProducts(uniqueProducts)
      setPage(state.page)
      setHasNextPage(state.hasNextPage)
      setScrollY(state.scrollY)
    } catch {
    }
  },[])

  useEffect(() => {
    let timeout:ReturnType<typeof setTimeout>

    const saveState = () => {
      sessionStorage.setItem('shop-scroll', JSON.stringify({
        scrollY: window.scrollY,
        products,
        page,
        hasNextPage,
      }))
    }
    const onScroll = () => {
      clearTimeout(timeout)
      timeout = setTimeout(saveState, 150)
    }

    const onClick = (e:MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a')
      if(link) saveState()
    }

    window.addEventListener('scroll', onScroll,{passive:true})
    document.addEventListener('click', onClick,true)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick,true)
    }
  },[products,page,hasNextPage])

  const loadMore = useCallback(async() => {

    if(loading || !hasNextPage) return

    setLoading(true)

    try{
      const params = new URLSearchParams({ page: String(page + 1), limit: '12' })
      const category = searchParams.get('category')
      const q = searchParams.get('q')
      if (category) params.set('category', category)
      if (q) params.set('q', q)
      const res = await fetch(`/shop/api?${params.toString()}`)
      const data = await res.json()

      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id))
        const newDocs = data.docs.filter((p: Product) => !existingIds.has(p.id))
        return [...prev, ...newDocs]
      })
      setPage(data.page)
      setHasNextPage(data.hasNextPage)
    } catch(err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  },[loading,hasNextPage,page,searchParams])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if(!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if(entries[0].isIntersecting) {
          loadMore()
        }
      },
      {rootMargin:'400px'},
    )

    observer.observe(sentinel)
    return() => observer.disconnect()
  },[loadMore])

  return (
    <div className="flex flex-wrap">
      {products.length > 0 ? (
        products.map((product) => <ProductGridItem key={product.id} product={product} />)
      ) : (
        <p>No products found.</p>
      )}
      <div ref={sentinelRef} className="w-full h-1" />
      {loading && (
        <div className="w-full flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
        </div>
      )}
    </div>
  )
}