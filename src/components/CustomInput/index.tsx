'use client'

import { useState } from 'react'

export const CustomInput = () => {

  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)


  return (
    <div className="relative">
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="peer border rounded-[8px] h-14 p-4 pl-3 border-black w-full"
      />

      <div
        className={`absolute bg-white top-0 left-2 -translate-y-1/2
                  grid transition-[grid-template-columns,padding] duration-200 ease-in-out 
                  ${value || isFocused ? 'px-1 grid-cols-[1fr]' : 'grid-cols-[0fr] px-0'}`}
      >
        <span
          className={`block min-w-0 transition-all duration-200 ease-in-out text-[#707072] font-medium ${value || isFocused ? 'translate-y-0 text-xs' : 'translate-y-7 text-base'}`}
        >
          Email*
        </span>
      </div>
    </div>
  )
}