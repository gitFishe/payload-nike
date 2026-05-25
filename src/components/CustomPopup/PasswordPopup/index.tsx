import { BasePopup } from '@/components/CustomPopup'
import { useEffect, useMemo, useState } from 'react'

import { CustomInput } from '@/components/CustomInput'
import { CrossIcon } from '@/components/icons/CrossIcon'
import { CustomBtnSmall } from '@/components/CustomBtnSmall'

type CartPopupProps = {
  isShown: boolean
  onClose: () => void
}

interface validTypes {
  curPass:boolean
  minimum8: boolean
  normalText: boolean
  doubt: boolean
}


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/

export const PasswordPopup = ({ isShown, onClose }: CartPopupProps) => {


  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const validation: validTypes = {

      curPass: Boolean(currentPassword),
      minimum8: newPassword.length >= 8,
      normalText: passwordRegex.test(newPassword),
      doubt: newPassword === repeatPassword,
  }


  const isFormValid = Object.values(validation).every(Boolean)

  const handleClick = ( ) => {
    setIsSubmitting(true)

    if(isFormValid) {
      console.log([currentPassword,newPassword,repeatPassword])
    } else {

    }

    setIsSubmitting(false)
  }

  return (
    <BasePopup
      isShown={isShown}
      onClose={onClose}
      className="max-w-134 max-h-[80%] w-full p-12 rounded-[24px]"
    >
      <div className="flex flex-col items-stretch">
        <h1 className="text-3xl font-medium pt-1 pb-6">Edit Password</h1>
        <div>
          <CustomInput
            customStyles="pt-1 pb-7"
            onChange={setCurrentPassword}
            value={currentPassword}
            label="Current Password*"
            errorMessage="Please enter your current password."
          />
          <CustomInput
            customStyles="pt-1 pb-6"
            onChange={setNewPassword}
            value={newPassword}
            label="New Password*"
            errorMessage="Please enter a valid new password."
            isError={!(validation.minimum8 && validation.normalText && newPassword.length > 0)}
          />
          <CustomInput
            customStyles="pt-1 pb-7"
            onChange={setRepeatPassword}
            value={repeatPassword}
            label="Confirm New Password*"
            errorMessage="Password does not match."
            isError={!validation.doubt && repeatPassword.length > 0}
          />
        </div>
        <div>
          <div className="relative pl-7">
            <span>Password requirements:</span>
          </div>
          <div
            className={`relative pl-7 ${validation.minimum8 || validation.normalText ? '' : 'border-[#d30005]'}`}
          >
            {validation.minimum8 ? '' : <CrossIcon styles="absolute left-0" />}
            <span className={validation.minimum8 ? 'text-[#007d48]' : ''}>
              Minimum of 8 characters
            </span>
          </div>
          <div className="relative pl-7">
            {validation.normalText ? '' : <CrossIcon styles="absolute left-0" />}
            <span className={validation.normalText ? 'text-[#007d48]' : ''}>
              Uppercase, lowercase letters, and one number
            </span>
          </div>
        </div>
        <CustomBtnSmall
          isDisabled={!isFormValid || !isSubmitting}
          click={handleClick}
          label="Save"
          styles="ml-auto mt-10 rounded-full px-4 py-1"
        />
      </div>
    </BasePopup>
  )
}
