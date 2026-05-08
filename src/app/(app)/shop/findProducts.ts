import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { buildProductQuery, SearchParams } from './buildProductQuery'

export async function findProducts(searchParams: SearchParams) {
  const { where, sort, limit, page } = buildProductQuery(searchParams)

  const payload = await getPayload({ config: configPromise })
  return await payload.find({
    collection: 'products',
    depth: 1,
    limit,
    page,
    sort,
    ...(where ? { where } : {}),
  })
}
