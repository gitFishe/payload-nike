'use client'
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
  return (
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker?.()}
        className={`peer border rounded-lg h-14 p-4 pl-3 w-full inputElem cursor-pointer ${isError ? 'border-[#d30005]' : 'border-[#707072] hover:border-primary focus:border-primary'}`}
      />

      <BaseLabel label={label} isFilled isError={isError} />

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