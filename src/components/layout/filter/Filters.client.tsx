'use client'

import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function FiltersClient({options}: {options:Record<string,string[]>}) {

  const [isOpen, setIsOpen] = useState<Set<string>>(new Set())
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const toggleHandler = (type:string) => {
    setIsOpen(prev => {
      const newSet = new Set(prev)
      if(newSet.has(type)) newSet.delete(type)
      else newSet.add(type)
      return newSet
    })
  }

  const toggleFilter = (type:string, value:string) => {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get(type)?.split(',').filter(Boolean) ?? []

   const next = current.includes(value)
    ? current.filter(v => v !== value)
     : [...current,value]

    if(next.length) params.set(type,next.join(','))
    else params.delete(type)

    router.replace(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <nav>
      {Object.entries(options).map(([type, values], i) => (
        <div key={i} className="border-b border-[#e5e5e5] last:border-b-0">
          <div
            onClick={() => toggleHandler(type)}
            className="h-13.5 py-3 relative font-medium cursor-pointer select-none"
          >
            <span>{type}</span>
            <div
              className={`absolute right-0 top-1/2 w-3.5 h-0.5 -translate-y-1/2 ${isOpen.has(type) ? 'filter-arrow-open' : ''}`}
            >
              <span className="filter-arrow-left" />
              <span className="filter-arrow-right" />
            </div>
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen.has(type) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden flex flex-col ">
              {values.map((v, i) => {
                const checked = (searchParams.get(type)?.split(',') ?? []).includes(v)

                return (
                  <button
                    key={i}
                    onClick={() => toggleFilter(type, v)}
                    className="flex hover:text-secondary py-1 cursor-pointer w-full text-left items-center"
                  >
                    <div
                      className={`mr-1.5 w-5 h-5 shrink-0 border border-black rounded-[4px] relative bg-black ${checked ? 'bg-black' : 'bg-white'}`}
                    >
                      <div
                        className={`absolute top-1/2 left-1/2 w-3.25 h-3.25 translate-x-[-50%] translate-y-[-50%] filter-checkbox ${checked ? 'is-toggled' : ''}`}
                      />
                    </div>
                    <span className="w-full block font-medium">{v} </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </nav>
  )
}