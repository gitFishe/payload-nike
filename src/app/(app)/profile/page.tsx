import { ProfileView } from '@/app/(app)/profile/ProfileView'
import {headers as getHeaders} from 'next/headers'
import {redirect} from 'next/navigation'
import {getPayload} from 'payload'
import configPromise from '@payload-config'

export default async function ProfilePage( ) {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({ headers })

  if (!user) redirect('/home')

  console.log(user, 'user')

  return <ProfileView user={user}/>
}