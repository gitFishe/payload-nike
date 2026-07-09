'use client'
import { useState } from 'react'
import { BaseLabel } from '@/components/CustomInput/BaseLabel'

type DateInputTypes = {
  value: string
  onChange: (value: string) => void
  isError?: boolean
  label: string
  errorMessage?: string
}

export const DateInput = ({
  value,
  onChange,
  isError,
  label,
  errorMessage,
}: DateInputTypes) => {
  const [isFocused, setIsFocused] = useState(false)
  const isFilled = Boolean(value) || isFocused

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
    <div className="relative">
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(formatDate(e.target.value))}
        value={value}
        inputMode="numeric"
        maxLength={12}
        placeholder={isFocused ? 'dd /mm /yyyy' : ''}
        className={`peer border rounded-lg h-14 p-4 pl-3 w-full inputElem ${isError ? 'border-[#d30005]' : 'border-[#707072] hover:border-primary focus:border-primary'}`}
      />

      <BaseLabel label={label} isFilled={isFilled} isError={isError} />

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
