import React from 'react'
import { ProductInfiniteList } from './ProductInfiniteList'
import { ProductsHeader } from '@/components/ProductsHeader'
import { SearchParams } from './buildProductQuery'
import { findProducts } from '@/app/(app)/shop/findProducts'

export const dynamic = 'force-dynamic'

export const metadata = {
  description: 'Search for products in the store.',
  title: 'Shop',
}

interface Props {
  searchParams: Promise<SearchParams>
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams
  const products = await findProducts(params)

  return (
    <div>
      <ProductsHeader />
      <ProductInfiniteList
        key={JSON.stringify(params)}
        initialDocs={products.docs}
        initialHasNextPage={products.hasNextPage}
      />
    </div>
  )
}
