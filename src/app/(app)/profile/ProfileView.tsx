import type { Interest, User } from '@/payload-types'
import Link from 'next/link'
import { Interests } from '@/app/(app)/profile/Interests'
type Props = {
  user: User
}

export const ProfileView = ({user}:Props) => {


  const PROFILE_LINKS = [
    { name: 'Profile', link: '/shop' },
    { name: 'Orders', link: '/shop' },
    { name: 'Favorites', link: '/shop' },
    { name: 'Settings', link: '/settings' },
  ]

  console.log(user.interests)

  return (
    <div className="container">
      <div className="flex">
        <ul className="mx-auto flex">
          {PROFILE_LINKS.map((obj, i) => (
            <li key={i}>
              <Link className="px-4 font-semibold hover:text-[#707072]" href={obj.link}>
                {obj.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center pt-25 pb-12">
        <div className="w-24 h-24 shrink-0 rounded-full bg-black mr-6"></div>
        <div>
          <h1 className="text-primary text-3xl">{user.name}</h1>
          <p className="text-[#707072]">Nike Member Since{user.createdAt}</p>
        </div>
      </div>
      <Interests interests={user.interests as Interest[] ?? []}/>
    </div>
  )
}