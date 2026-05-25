'use client'

import Link from 'next/link'
import { CustomInput } from '@/components/CustomInput'
import { PasswordPopup } from '@/components/CustomPopup/PasswordPopup'
import { useState } from 'react'

export default function Settings()  {

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isShown, setIsShown] = useState(false)

  const popupHandler = () => {
    setIsShown((old) => !old)
  }

  const validateEmail = (value:string) => {
    setEmail(value)

    if (/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  const saveData = () => {
    setIsLoading(true)

    console.log(email)

    if(!emailError && email !== '') {
      console.log(email)
    } else {
      console.log('error')
    }
    setIsLoading(false)

  }

  return (
    <div className="test">
      <div className="w-100">
        <h2 className="text-2xl">Account Details</h2>

        <div className="mt-5">
          <CustomInput onChange={validateEmail} value={email} isError={emailError} label="Email" />
        </div>

        <div className="mt-7.5">
          <h3 className="font-medium">Password</h3>
          <div className="py-3 pr-5 flex justify-between items-center">
            <span className="align-middle">••••••••••••••••</span>
            <button onClick={popupHandler}>Edit</button>
          </div>
        </div>

        <div className="mt-3">
          <h3 className="font-medium">Phone number</h3>
          <div className="py-3 pr-5 flex justify-between items-center">
            <span className="align-middle">550 534 718</span>
          </div>
        </div>

        <div className="mt-5">
          <CustomInput onChange={validateEmail} value={email} isError={emailError} label="Email" />
        </div>

        <div className="mt-5">
          <h3 className="font-medium">Location</h3>
          <CustomInput
            customStyles="mt-3"
            onChange={validateEmail}
            value={email}
            isError={emailError}
            label="Email"
          />
        </div>

        <div className="border-t border-b py-6 mt-5 flex justify-between items-center">
          <h3 className="font-medium">Delete Account</h3>
          <button className="border rounded-full px-3.5 py-0.75 font-medium cursor-pointer hover:border-black">
            Delete
          </button>
        </div>

        <button
          disabled={isLoading}
          onClick={saveData}
          className={`bg-black text-white px-3 py-1.5 mt-10 ml-auto rounded-[30px] disabled:bg-gray-300 ${isLoading ? 'cursor-auto' : 'cursor-pointer'}`}
        >
          Save
        </button>
      </div>
      <PasswordPopup isShown={isShown} onClose={popupHandler} />
    </div>
  )
}