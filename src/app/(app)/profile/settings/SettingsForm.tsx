'use client'

import type {User} from '@/payload-types'
import { useState } from 'react'
import { CustomInput } from '@/components/CustomInput'
import { PasswordPopup } from '@/components/CustomPopup/PasswordPopup'
import {countryOptions} from '@/lib/countries'
import { TextInput } from '@/components/CustomInput/TextInput'


export const SettingsForm = ({ user }: { user: User }) => {
  const [email, setEmail] = useState(user.email ?? '')
  const [emailError, setEmailError] = useState(false)
  const [phone, setPhone] = useState(user.phone ?? '')
  const [country, setCountry] = useState(user.country ?? '')

  const [dob, setDob] = useState(user.dateOfBirth?.slice(0,10) ?? '')

  const [isLoading, setIsLoading] = useState(false)



  const [isShown, setIsShown] = useState(false)

  const popupHandler = () => {
    setIsShown((old) => !old)
  }

  const validateEmail = (value: string) => {
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

    if (!emailError && email !== '') {
      console.log(email)
    } else {
      console.log('error')
    }
    setIsLoading(false)
  }


  console.log(user,'user')

  return (
    <div className="test">
      <div className="w-100">
        <h2 className="text-2xl">Account Details</h2>

        <div className="mt-5">
          <TextInput
            onChange={validateEmail}
            value={email}
            isError={emailError}
            label="Email" />
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
          <TextInput onChange={validateEmail} value={country} isError={emailError} label="Email" />
        </div>

        <div>
          {countryOptions.map((item, i) => (
            <span key={i}>{item.label}</span>
          ))}
        </div>

        <div className="mt-5">
          <h3 className="font-medium">Location</h3>
          <TextInput
            customStyles="mt-3"
            onChange={() => console.log('typed')}
            value={dob}
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