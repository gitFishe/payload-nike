'use client'

import type {ReactNode} from 'react'
import Image from 'next/image'
import { ProfileNav } from '@/payload-types'
import Link from 'next/link'

type NavItem = NonNullable<ProfileNav['items']>[number]

type settingsProps = {
  items:NavItem[]
}

export const SettingsSidebar = ({items}:settingsProps) => {
  const baseUrl = '/profile/settings'
  
  return (
    <div className='max-w-[290px] pr-6 pb-8'>
      <div>
        <ul>
          {items.map((item, i) => {
            console.log(item)

            return (
              <li key={i}>
                <Link
                  className="h-11 flex items-center"
                  href={item.slug ? baseUrl + item.slug : baseUrl}
                >
                  {typeof item.icon === 'object' && (
                    <div className="w-6 h-6 mr-4.5">
                      <Image className='object-fill' width={26} height={26} alt={item.icon.alt} src={item.icon.url || ''} />
                    </div>
                  )}
                  <span className='font-medium'>{item.label}</span>
                </Link>
              </li>
            )

          })}
        </ul>
      </div>
    </div>
  )
}