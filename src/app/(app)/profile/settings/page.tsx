import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SettingsForm } from './SettingsForm'

export default async function Settings()  {

  const headers = await getHeaders()
  const payload = await getPayload({config: configPromise})
  const {user} =  await payload.auth({headers})

  if(!user) redirect('/login')

  const countries = await payload.find({
    collection: 'countries',
    limit: 0,
    sort: 'label',
  })

  return <SettingsForm user={user} countries={countries.docs} />
}