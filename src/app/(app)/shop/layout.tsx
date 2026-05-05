import { Categories } from '@/components/layout/search/Categories'
import React from 'react'


export default function ShopLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="container flex pt-3.5 pb-4 text-primary bg-white relative">
      {/*<Search className="mb-8" />*/}

      <div className="flex flex-col md:flex-row items-start justify-between">
        <div
          style={{ animation: 'containerSlideIn 500ms 1000ms ease-in-out forwards' }}
          className="h-full -ml-41.5 shrink-0 opacity-0"
        >
          <div
            style={{ animation: 'innerOpacity 500ms 1000ms ease-in-out forwards' }}
            className="w-41.5  flex-none flex flex-col basis-1/5 sticky top-0 pt-5 max-w-50 pr-5 opacity-0"
          >
            <Categories />
          </div>
        </div>
        <div className="min-h-screen w-full">{children}</div>
      </div>
    </div>
  )
}
