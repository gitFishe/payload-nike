import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req:NextRequest) {

  const {searchParams} = req.nextUrl;
  console.log(searchParams,'searchParams')

  const page = parseInt(searchParams.get('page') || '1',10)
  const limit = parseInt(searchParams.get('limit') || '12',10)
  const category = searchParams.get('category') || null
  const searchValue = searchParams.get('q') || null

  const where: any = {}

  if (category) {
    where.productType = { equals: category }
  }

  if (searchValue) {
    where.or = [{ title: { like: searchValue } }, { subTitle: { like: searchValue } }]
  }

  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    limit: limit,
    page: page,
    ...(Object.keys(where).length > 0 ? { where } : {}),
  })

  return NextResponse.json({
    docs:products.docs,
    hasNextPage: products.hasNextPage,
    page:products.page,
    totalPages:products.totalPages,
  })
}
