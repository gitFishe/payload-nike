import {getPayload} from 'payload'
import configPromise from "@payload-config"
import { FiltersClient } from '@/components/layout/filter/Filters.client'

async function getFilterOptions(payload:any) {
  const {sql} = await import('@payloadcms/db-postgres')

  const result = await payload.db.drizzle.execute(
    sql`SELECT DISTINCT type FROM products_filters WHERE type IS NOT NULL ORDER BY type`,
  )
  const types:string[] = result.rows.map((r:any) => r.type);

  const options:Record<string,string[]> = {}

  for (const type of types) {
    if(type === 'onSale') {
      options[type] = ['Yes']
      continue
    }

    const tableName = `products_filters_${type}`
    try {
      const result = await payload.db.drizzle.execute(
        sql.raw(`SELECT DISTINCT value FROM "${tableName}" ORDER BY value`)
      )
      options[type] = result.rows.map((r:any) => r.value)
    } catch {
      console.warn(`Table ${tableName} does not exist. Skipping.`)
    }
  }

  return options
}

export async function Filters() {
  const payload = await getPayload({ config: configPromise })
  const options = await getFilterOptions(payload)
  return <FiltersClient options={options}/>
}