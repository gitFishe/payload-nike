type BtnProps = {
  isDisabled?:boolean,
  styles?:string,
  click?: () => void,
  label:string,
}

export const CustomBtnSmall = ({isDisabled = false,styles,click,label}:BtnProps) => {

  return (
     <button
       onClick={click}
       disabled={isDisabled}
       className={`font-medium ${styles} ${isDisabled ? 'bg-[#e5e5e5] text-[#cacacb] cursor-default' : 'bg-black text-white cursor-pointer'}`}>
       <span>
         {label}
       </span>
     </button>
  )
}