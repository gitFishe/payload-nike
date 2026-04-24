import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { z } from 'zod';

export async function GET(req:NextRequest) {
  const schema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(12),
    category: z.string().optional(),
    q: z.string().min(1).optional(),
    sortBy: z.string().optional(),
  });

  const parsed = schema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: z.treeifyError(parsed.error) }, { status: 400 })
  }
  const { page, limit, category, q: searchValue, sortBy } = parsed.data;

  const and: any[] = [];

  if (category) and.push({ productType: { equals: category } });

  if (searchValue) {
    and.push({ or: [
        { title: { like: searchValue } },
        { subTitle: { like: searchValue } },
      ]});
  }

  const where = and.length > 0 ? { and } : {}

  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: limit,
    page: page,
    sort: sortBy ?? 'created',
    ...where,
  });

  return NextResponse.json({
    docs:products.docs,
    hasNextPage: products.hasNextPage,
    page:products.page,
    totalPages:products.totalPages,
    totalDocs: products.totalDocs,
  })
}
