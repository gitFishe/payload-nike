import { getPayload } from 'payload'
import { SettingsSidebar } from '@/app/(app)/profile/settings/SettingsSidebar'

import type {ReactNode} from 'react'
import config from '@payload-config'

export default async function SettingsLayout({children}:{children:ReactNode}) {
  const payload = await getPayload({config})
  const nav = await payload.findGlobal({slug:'profile-nav'});
  return (
    <div className="container">
      <div className='p-12.5'>
        <h1 className="text-2xl pb-9">Settings</h1>
        <div className="flex">
          <SettingsSidebar items={nav.items ?? []} />
          <div className="ml-35 pt-9 pb-12 px-1.5">{children}</div>
        </div>
      </div>
    </div>
  )

}