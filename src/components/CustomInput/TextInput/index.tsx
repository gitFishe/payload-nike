'use client'

import { forwardRef, useState, type ComponentPropsWithoutRef } from 'react'
import { BaseLabel } from '@/components/CustomInput/BaseLabel'

type TextInputTypes = {
  isError?: boolean
  label: string
  errorMessage?: string
} & ComponentPropsWithoutRef<'input'>

export const TextInput = forwardRef<HTMLInputElement, TextInputTypes>(function TextInput(
  {
    isError,
    label,
    errorMessage,
    className,
    onChange,
    onFocus,
    onBlur,
    ...inputProps
  },
  ref,
) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(Boolean(inputProps.defaultValue ?? inputProps.value))

  const isFilled = hasValue || isFocused

  return (
    <div className="relative">
      <input
        {...inputProps}
        ref={ref}
        onFocus={(e) => {
          setIsFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== '')
          onChange?.(e)
        }}
        className={`peer border rounded-lg h-14 p-4 pl-3 w-full inputElem ${isError ? 'border-[#d30005]' : 'border-[#707072] hover:border-primary focus:border-primary'} ${className ?? ''}`}
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
})