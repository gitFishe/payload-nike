import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { sorting } from '@/lib/constants'
import { Search } from '@/components/Search'
import React, { Suspense } from 'react'


export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex gap-8 pt-3.5 pb-4 text-primary bg-white">
      {/*<Search className="mb-8" />*/}

      <div className="flex flex-col md:flex-row items-start justify-between gap-16 md:gap-4">
        <div className="w-full flex-none flex flex-col gap-4 md:gap-8 basis-1/5">
          <Suspense fallback={null}>
            <Categories />
          </Suspense>
        </div>
        <div className="min-h-screen w-full">{children}</div>
      </div>
    </div>
  )
}
