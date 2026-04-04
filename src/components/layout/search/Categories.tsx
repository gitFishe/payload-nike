import configPromise from '@payload-config'
import { getPayload } from 'payload'
import clsx from 'clsx'
import React, { Suspense } from 'react'

import { FilterList } from './filter'
import { CategoryItem } from './Categories.client'
import { sql } from '@payloadcms/db-postgres'

async function CategoryList() {
  const payload = await getPayload({ config: configPromise })


  const result = await payload.db.drizzle.execute(
    sql`SELECT DISTINCT "product_type" FROM products WHERE "product_type" IS NOT NULL`,
  )

  const categories = result.rows.map((r: any) => r.product_type)

  return (
    <div>
      <h3 className="text-xs mb-2 text-neutral-500 dark:text-neutral-400">Category</h3>

      <ul>
        {categories.map((category) => {
          return (
            <li key={category}>
              <CategoryItem category={category} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300'
const items = 'bg-neutral-400 dark:bg-neutral-700'

export function Categories() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className={clsx(skeleton, activeAndTitles)} />
          ))}

          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={clsx(skeleton, items)} />
          ))}

        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}
