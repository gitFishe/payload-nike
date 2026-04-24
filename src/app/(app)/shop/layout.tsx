import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { sorting } from '@/lib/constants'
import { Search } from '@/components/Search'
import React, { Suspense } from 'react'


export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex pt-3.5 pb-4 text-primary bg-white relative">
      {/*<Search className="mb-8" />*/}

      <div className="flex flex-col md:flex-row items-start justify-between md:gap-4">
        <div className="w-full flex-none flex flex-col basis-1/5 sticky top-0 pt-5 max-w-50 pr-5">
          <Categories />
        </div>
        <div className="min-h-screen w-full px-10">{children}</div>
      </div>
    </div>
  )
}
