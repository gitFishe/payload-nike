import { NextRequest, NextResponse } from 'next/server'
import { findProducts } from '../findProducts'
import type { SearchParams } from '../buildProductQuery'

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams) as SearchParams
  const products = await findProducts(params)

  return NextResponse.json({
    docs: products.docs,
    hasNextPage: products.hasNextPage,
    page: products.page,
    totalPages: products.totalPages,
    totalDocs: products.totalDocs,
  })
}
