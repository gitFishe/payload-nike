'use client'

import { useEffect, useRef, useState } from 'react'
import { BaseLabel } from '@/components/CustomInput/BaseLabel'

export type LocationOption = {
  label: string
  value: string | number
}

type LocationInputProps = {
  label: string
  options: LocationOption[]
  value?: string | number | null
  isError?: boolean
  errorMessage?: string
  onChange?: (value: string | number) => void
}

export const LocationInput = ({
  label,
  options,
  value,
  isError,
  errorMessage,
  onChange,
}: LocationInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selected = options.find((option) => option.value === value)
  const isFilled = Boolean(selected) || isOpen

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectOption = (optionValue: string | number) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((old) => !old)}
          className={`peer border rounded-lg h-14 p-4 pl-3 w-full flex items-center justify-between text-left cursor-pointer ${
            isError ? 'border-[#d30005]' : 'border-[#707072] hover:border-primary'
          } ${isOpen ? 'border-primary' : ''}`}
        >
          <span className={selected ? 'text-black' : 'text-transparent'}>
            {selected?.label ?? label}
          </span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="#707072"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <BaseLabel label={label} isFilled={isFilled} isError={isError} />

        {isOpen && (
          <ul className="absolute z-10 top-full left-0 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-[#707072] rounded-lg py-1 shadow-lg">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => selectOption(option.value)}
                  className={`w-full text-left px-4 py-2.5 cursor-pointer hover:bg-gray-100 ${
                    option.value === value ? 'font-medium bg-gray-50' : ''
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {errorMessage && isError ? (
        <div className="px-3 pt-1 absolute bottom-0.5 left-0">
          <span className="text-[#d30005] text-xs font-medium">{errorMessage}</span>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}