import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import { ProductInfiniteList } from './ProductInfiniteList'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
export const dynamic = 'force-dynamic'
export const metadata = {
  description: 'Search for products in the store.',
  title: 'Shop',
}

type SearchParams = { [key: string]: string | string[] | undefined }

// type Props = {
//   searchParams: Promise<SearchParams>
// }

export default async function ShopPage(props: any) {
  const searchParams = await props.searchParams
  const { q: searchValue, sort, category } = searchParams
  const payload = await getPayload({ config: configPromise })

  const where: any = {}

  const Reserved = new Set(['q','sort','category', 'page'])
  const andConditions: any[] = []

  for (const [key,raw] of Object.entries(searchParams)) {
    if(Reserved.has(key) || !raw) continue

    const values = String(raw).split(',').filter(Boolean)
    if(!values.length) continue

    if(key === 'onSale') {
      andConditions.push({[`filters.${key}`]:{equals:true}})
    } else {
      andConditions.push({[`filters.${key}`]:{in:values}})
    }
  }

  if(andConditions.length) where.and = andConditions

  if (category) {
    where.productType = { equals: category }
  }

  if (searchValue) {
    where.or = [{ title: { like: searchValue } }, { subTitle: { like: searchValue } }]
  }

  const products = await payload.find({
    collection: 'products',
    draft: true,
    overrideAccess: true,
    limit: 12,
    page: 1,
    sort: 'id',
    ...(Object.keys(where).length > 0 ? { where } : {}),
  })

  const resultsText = products.docs.length > 1 ? 'results' : 'result'

  return (
    <ProductInfiniteList
      initialDocs={products.docs}
      initialTotalPages={products.totalPages}
      initialHasNextPage={products.hasNextPage}
    />

    // <div className="flex h-full padding-x-10 flex-wrap">
    //   {searchValue ? (
    //     <p className="mb-4">
    //       {products.docs?.length === 0
    //         ? 'There are no products that match '
    //         : `Showing ${products.docs.length} ${resultsText} for `}
    //       <span className="font-bold">&quot;{searchValue}&quot;</span>
    //     </p>
    //   ) : null}
    //
    //   {products?.docs.length > 0 ? (
    //     products.docs.map((product) => {
    //       return <ProductGridItem key={product.id} product={product} />
    //     })
    //   ) : (
    //     <p className="mb-4">No products found. Please try different filters.</p>
    //   )}
    // </div>
  )
}
