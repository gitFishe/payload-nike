'use client'

import type {Country, User} from '@/payload-types'
import { useState } from 'react'
import { PasswordPopup } from '@/components/CustomPopup/PasswordPopup'
import { TextInput } from '@/components/CustomInput/TextInput'
import { LocationInput } from '@/components/CustomInput/LocationInput'
import { DateInput } from '@/components/CustomInput/DateInput'


export const SettingsForm = ({ user, countries }: { user: User; countries: Country[] }) => {
  const [email, setEmail] = useState(user.email ?? '')
  const [emailError, setEmailError] = useState(false)
  const [phone, setPhone] = useState(user.phone ?? '')
  const [country, setCountry] = useState<string | number>(
    (typeof user.country === 'object' ? user.country?.id : user.country) ?? '',
  )

  const countryOptions = countries.map((item) => ({ label: item.label, value: item.id }))

  const [dob, setDob] = useState(user.dateOfBirth?.slice(0,10) ?? '')

  const [btnDisabled, setBtnDisabled] = useState(false)



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
    setBtnDisabled(true)

    console.log(email)

    if (!emailError && email !== '') {
      console.log(email)
    } else {
      console.log('error')
    }
    setBtnDisabled(false)
  }


  console.log(user,'user')

  return (
    <div className="test">
      <div className="w-100">
        <h2 className="text-2xl">Account Details</h2>

        <div className="mt-5">
          <TextInput
            onChange={(e) => validateEmail(e.target.value)}
            value={email}
            isError={emailError}
            label="Email"
          />
        </div>

        <div className="mt-7.5">
          <h3 className="font-medium">Password</h3>
          <div className="py-3 pr-5 flex justify-between items-center">
            <span className="align-middle">••••••••••••••••</span>
            <button
              className="underline decoration-2 underline-offset-4 cursor-pointer"
              onClick={popupHandler}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="mt-3">
          <h3 className="font-medium">Phone number</h3>
          <div className="py-3 pr-5 flex justify-between items-center">
            <span className="align-middle">550 534 718</span>
          </div>
        </div>

        <div className="mt-5">
          <DateInput
            label='Date of Birth*'
            value={dob}
            onChange={(value) => setCountry(value)}
          />
        </div>

        <div className="mt-5">
          <LocationInput
            label="Country"
            options={countryOptions}
            value={country}
            onChange={(value) => setCountry(value)}
          />
        </div>

        <div className="border-t border-b py-6 mt-5 flex justify-between items-center">
          <h3 className="font-medium">Delete Account</h3>
          <button className="border rounded-full px-3.5 py-0.75 font-medium cursor-pointer hover:border-black">
            Delete
          </button>
        </div>

        <button
          disabled={btnDisabled}
          onClick={saveData}
          className={`text-white px-3 py-1.5 mt-10 ml-auto rounded-[30px] disabled:bg-gray-300 ${btnDisabled ? 'bg-gray-300 cursor-auto' : 'bg-black cursor-pointer'}`}
        >
          Save
        </button>
      </div>
      <PasswordPopup isShown={isShown} onClose={popupHandler} />
    </div>
  )
}