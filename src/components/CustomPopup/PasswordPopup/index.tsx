'use client'

import { BasePopup } from '@/components/CustomPopup'
import { useForm } from 'react-hook-form'

import { CrossIcon } from '@/components/icons/CrossIcon'
import { CustomBtnSmall } from '@/components/CustomBtnSmall'
import { TextInput } from '@/components/CustomInput/TextInput'

type CartPopupProps = {
  isShown: boolean
  onClose: () => void
}

type PasswordFormValues = {
  currentPassword: string
  newPassword: string
  repeatPassword: string
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/

export const PasswordPopup = ({ isShown, onClose }: CartPopupProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PasswordFormValues>({
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
  })

  const newPassword = watch('newPassword')

  const minimum8 = newPassword.length >= 8
  const normalText = passwordRegex.test(newPassword)

  const onSubmit = async (data: PasswordFormValues) => {
    console.log([data.currentPassword, data.newPassword, data.repeatPassword])
    reset()
    onClose()
  }

  return (
    <BasePopup
      isShown={isShown}
      onClose={onClose}
      className="max-w-134 max-h-[80%] w-full p-12 rounded-[24px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-stretch">
        <h1 className="text-3xl font-medium pt-1 pb-6">Edit Password</h1>
        <div>
          <TextInput
            type="password"
            label="Current Password*"
            isError={Boolean(errors.currentPassword)}
            errorMessage={errors.currentPassword?.message}
            {...register('currentPassword', {
              required: 'Please enter your current password.',
            })}
          />
          <TextInput
            type="password"
            label="New Password*"
            isError={Boolean(errors.newPassword)}
            errorMessage={errors.newPassword?.message}
            {...register('newPassword', {
              required: 'Please enter a valid new password.',
              minLength: { value: 8, message: 'Please enter a valid new password.' },
              pattern: { value: passwordRegex, message: 'Please enter a valid new password.' },
            })}
          />
          <TextInput
            type="password"
            label="Confirm New Password*"
            isError={Boolean(errors.repeatPassword)}
            errorMessage={errors.repeatPassword?.message}
            {...register('repeatPassword', {
              required: 'Password does not match.',
              validate: (value) => value === getValues('newPassword') || 'Password does not match.',
            })}
          />
        </div>
        <div>
          <div className="relative pl-7">
            <span>Password requirements:</span>
          </div>
          <div className={`relative pl-7 ${minimum8 || normalText ? '' : 'border-[#d30005]'}`}>
            {minimum8 ? '' : <CrossIcon styles="absolute left-0" />}
            <span className={minimum8 ? 'text-[#007d48]' : ''}>Minimum of 8 characters</span>
          </div>
          <div className="relative pl-7">
            {normalText ? '' : <CrossIcon styles="absolute left-0" />}
            <span className={normalText ? 'text-[#007d48]' : ''}>
              Uppercase, lowercase letters, and one number
            </span>
          </div>
        </div>
        <CustomBtnSmall
          isDisabled={!isValid || isSubmitting}
          label="Save"
          styles="ml-auto mt-10 rounded-full px-4 py-1"
        />
      </form>
    </BasePopup>
  )
}