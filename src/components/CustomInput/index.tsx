'use client'

import { ReactNode } from 'react'

type CustomInputProps = {
  customStyles?: string
  children: ReactNode,
}

export const CustomInput = ({ customStyles, children }: CustomInputProps) => {

  return (
    <div className={`relative ${customStyles ?? customStyles}`}>
      {children}
    </div>
  )
}