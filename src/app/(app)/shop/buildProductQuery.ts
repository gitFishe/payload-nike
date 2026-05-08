import type { Where } from 'payload'

export type SearchParams = { [key: string]: string | string[] | undefined }

const RESERVED = new Set(['q', 'sort', 'category', 'page', 'limit'])

const DEFAULT_SORT = '-createdAt'
const DEFAULT_LIMIT = 12

export type ProductQuery = {
  where: Where | undefined
  sort: string
  limit: number
  page: number
}

export function buildProductQuery(searchParams: SearchParams): ProductQuery {
  const { q: searchValue, sort, category, page, limit } = searchParams

  const where: Where = {}
  const and: Where[] = []

  for (const [key, raw] of Object.entries(searchParams)) {
    if (RESERVED.has(key) || !raw) continue

    const values = String(raw).split(',').filter(Boolean)
    if (!values.length) continue

    if (key === 'onSale') {
      and.push({ [`filters.${key}`]: { equals: true } })
    } else {
      and.push({ [`filters.${key}`]: { in: values } })
    }
  }

  if (typeof category === 'string' && category) {
    where.productType = { equals: category }
  }

  if (typeof searchValue === 'string' && searchValue) {
    and.push({or: [{ title: { contains: searchValue } }, { subTitle: { contains: searchValue } }]})
  }

  if (and.length) where.and = and

  return {
    where: Object.keys(where).length > 0 ? where : undefined,
    sort: typeof sort === 'string' && sort ? sort : DEFAULT_SORT,
    limit: Number(limit) || DEFAULT_LIMIT,
    page: Number(page) || 1,
  }
}
