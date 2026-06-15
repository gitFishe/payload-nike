'use client'

import { CustomInput } from '@/components/CustomInput'
import { useState } from 'react'

type TextInputTypes = {
  value: string
  onChange: (value: string) => void
  isError?: boolean
  label: string
  customStyles?: string
  errorMessage?: string
}

export const TextInput = ({value,onChange,isError,label,customStyles,errorMessage}: TextInputTypes) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <CustomInput>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className={`peer border rounded-[8px] h-14 p-4 pl-3 w-full inputElem ${isError ? 'border-[#d30005]' : 'border-[#707072] hover:border-primary focus:border-primary'}`}
      />

      <div
        className={`absolute bg-white top-0 left-2 -translate-y-1/2
                  grid transition-[grid-template-columns,border] duration-200 ease-in-out border-white
                  ${value || isFocused ? 'px-1 grid-cols-[1fr] border-l-4 border-r-4' : 'grid-cols-[0fr] border-0'}`}
      >
        <span
          className={`block min-w-0 transition-all duration-200 ease-in-out text-[#707072] whitespace-nowrap font-medium text-xs ${isError ? 'text-red-600' : 'peer-focus:text-primary'} ${value || isFocused ? 'text-primary translate-y-0 scale-100' : 'text-[#707072] translate-y-7 scale-120'}`}
        >
          {label}
        </span>
      </div>

      {errorMessage && isError ? (
        <div className="px-3 pt-1 absolute bottom-0.5 left-0">
          <span className="text-[#d30005] text-xs font-medium">{errorMessage}</span>
        </div>
      ) : (
        ''
      )}
    </CustomInput>
  )
}