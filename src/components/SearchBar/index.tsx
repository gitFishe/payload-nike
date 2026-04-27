'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

export const SearchBar = ({additionalClasses} : any)=> {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [inputValue, setInputValue] = useState(params.get('q') ?? '')


  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputValue) {
      const nextSearchParams = new URLSearchParams(params.toString())

      nextSearchParams.delete('q')
      router.replace(`${pathname}?${nextSearchParams}`)
    } else {
      const next = new URLSearchParams(params.toString())
      next.set('q',inputValue)

      router.push(`/shop?${next.toString()}`)
    }
  }

  return (
    <div className={`${additionalClasses}`}>
      <form
        onSubmit={formHandler}
        className="h-9 bg-[#f5f5f5] rounded-3xl flex w-42 pr-1">

        <button
          type="submit"
          className="rounded-full w-9 h-9 hover:bg-gray-300 flex items-center justify-center shrink-0 mr-1 cursor-pointer "
        >
          <img src="/icon/search-icon.svg" />
        </button>
        <div className="w-auto">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search"
            className="placeholder:text-[#707483] text-black w-full h-full focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>
      </form>
    </div>
  )
}