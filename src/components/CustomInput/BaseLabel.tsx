interface FloatingLabelProps {
  label:string,
  isFilled:boolean,
  isError?:boolean,
}

export const BaseLabel = ({label,isFilled,isError}:FloatingLabelProps) => {
  return (
    <div
      className={`absolute bg-white top-0 left-2 -translate-y-1/2
                  grid transition-[grid-template-columns,border] duration-200 ease-in-out border-white
                  ${isFilled ? 'px-1 grid-cols-[1fr] border-l-4 border-r-4' : 'grid-cols-[0fr] border-0'}`}
    >
      <span
        className={`block min-w-0 transition-all duration-200 ease-in-out text-[#707072] whitespace-nowrap font-medium text-xs 
        ${isError 
            ? 'text-red-600' 
            : 'peer-focus:text-primary'} 
        ${isFilled
            ? 'text-primary translate-y-0 scale-100'
            : 'text-[#707072] translate-y-7 scale-120'}
        `}
      >
        {label}
      </span>
    </div>
  )
}