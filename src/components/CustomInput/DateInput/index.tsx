'use client'

import { CustomInput } from '@/components/CustomInput'
import { useState } from 'react'

type DateInputTypes = {
  value: string
  onChange: (value: string) => void
  isError?: boolean
  label: string
  customStyles?: string
  errorMessage?: string
}

export const DateInput = ({
  value,
  onChange,
  isError,
  label,
  customStyles,
  errorMessage,
}: DateInputTypes) => {
  const [isFocused, setIsFocused] = useState(false)

  const formatDate = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    const dd = digits.slice(0, 2)
    const mm = digits.slice(2, 4)
    const yyyy = digits.slice(4, 8)
    if (digits.length <= 2) return dd
    if (digits.length <= 4) return `${dd} /${mm}`
    return `${dd} /${mm} /${yyyy}`
  }

  return (
    <CustomInput>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(formatDate(e.target.value))}
        value={value}
        inputMode="numeric"
        maxLength={12}
        placeholder={isFocused ? 'dd /mm /yyyy' : ''}
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
