import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getGlobal } from '@/utilities/getGlobals'
import React, { Suspense } from 'react'

type Props = {
  data: Footer['subFooterText']
}

export async function Footer() {
  const footer: Footer = await getGlobal('footer')

  const columns = footer.columns

  console.log('footer', footer)


  return (
    <footer className="text-sm">
      <div className="container">
        <div className="flex w-full justify-between border-t border-[#e5e5e5] pt-15">
          {columns?.map((column, i) => (
            <ul key={i} className="text-[#707072] flex flex-col gap-3">
              <h4 className="text-[#111111] font-semibold pb-6">{column.heading}</h4>
              {column.links?.map((row, i) => (
                <li key={i}>{row.label}</li>
              ))}
            </ul>
          ))}
          <div className="flex">
            <span>United States</span>
          </div>
        </div>
        <SubFooter data={footer.subFooterText} />
      </div>
      <ThemeSelector />
    </footer>
  )
}


const SubFooter = ({ data }: Props) => {
  if (!data?.length) return null

  return (
    <div className="flex gap-4 mt-18 text-[#707072] font-semibold">
      {data.map((item) => (
        <span key={item.id}>{item.label}</span>
      ))}
    </div>
  )
}
