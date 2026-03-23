'use client'
import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import Link from 'next/link'
import React, { Suspense, useState } from 'react'

import { MobileMenu } from './MobileMenu'
import type { Header } from 'src/payload-types'

import { LogoIcon } from '@/components/icons/logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import { SearchBar } from '@/components/SearchBar'

type LinkItem = {
  id: string
  ulName: string
  ulLink?: string
}

type ColumnGroup = {
  id: string
  col: LinkItem[]
  showCol2: boolean
  col2: LinkItem[]
}

type NavItem = {
  id: string
  tabName: string
  tabLink?: string
  colLinks: ColumnGroup[]
}

type Props = {
  header: {
    logo: {
      url: string
      alt?: string
    }
    navItems: NavItem[]
    searchBar:boolean
  }
}


export function HeaderClient({
  header
                             }: Props) {

  const navItems = header.navItems || []
  const logo = header.logo
  const pathname = usePathname()

  const renderColumnLinks = (column: ColumnGroup) => {
    return (
      <div key={column.id} className="px-4">
        <ul className="[&>li:first-child]:text-base text-sm [&>li:first-child]:font-semibold font-medium [&>li:first-child]:text-black text-[#737075] [&>li:first-child]:mb-1 cursor-pointer">
          {column.col.map((row) => (
            <li className="mt-0.5 hover:text-black" key={row.id}>
              {row.ulName}
            </li>
          ))}
        </ul>

        {column.showCol2 && column.col2?.length ? (
          <ul className="[&>li:first-child]:text-base text-sm [&>li:first-child]:font-semibold [&>li:first-child]:text-black text-[#737075] mt-10 cursor-pointer">
            {column.col2.map((row) => (
              <li className="hover:text-black" key={row.id}>
                {row.ulName}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  }

  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div
      className={`bg-white relative z-20
      before
      before:absolute
      before:top-0
      before:left-0
      before:w-full
      before:h-screen
      before:bg-gray-300
      before:z-5
      before:opacity-0
      before:transition-opacity
      before:duration-200
      before:ease-out
      before:pointer-events-none
      ${openId ? 'before:opacity-20' : ''}
      `}
    >
      <div className="container">
        <div className="flex h-15 justify-between items-center">
          <div className="w-10 h-10 border">
            {/* eslint-disable-next-line @next/next/no-img-element,jsx-a11y/alt-text */}
            {/*<img src={logo.url || undefined} />*/}
          </div>

          <ul className="flex absolute text-black h-15 w-full items-center justify-center left-0">
            {navItems.map((nav) => (
              <li
                key={nav.id}
                className="px-3 z-50 h-full"
                onMouseEnter={() => setOpenId(nav.id)}
                onMouseLeave={() => setOpenId(null)}
                onFocus={() => setOpenId(nav.id)}
                onBlur={() => setOpenId(null)}
              >
                <div className="h-full flex items-center">
                  <a
                    href="asdjhkas"
                    className="cursor-pointer hover:underline underline-offset-4 decoration-2 font-medium"
                  >
                    {nav.tabName}
                  </a>
                </div>

                {/*dropdown*/}
                <div
                  className={`absolute left-0 top-full w-full py-10 bg-white justify-center ${openId === nav.id ? 'flex' : 'hidden'}`}
                >
                  {nav.colLinks?.map(renderColumnLinks)}
                </div>
              </li>
            ))}
          </ul>

          {header.searchBar ? (
            <SearchBar additionalClasses='flex z-50'/>
          ) : null}
        </div>
      </div>
    </div>
  )
}


// <div className="relative z-20 border-b">
//   <nav className="flex items-center md:items-end justify-between container pt-2">
//     <div className="block flex-none md:hidden">
//       <Suspense fallback={null}>
//         <MobileMenu menu={menu} />
//       </Suspense>
//     </div>
//     <div className="flex w-full items-end justify-between">
//       <div className="flex w-full items-end gap-6 md:w-1/3">
//         <Link className="flex w-full items-center justify-center pt-4 pb-4 md:w-auto" href="/">
//           <LogoIcon className="w-6 h-auto" />
//         </Link>
//         {menu.length ? (
//           <ul className="hidden gap-4 text-sm md:flex md:items-center">
//             {menu.map((item) => (
//               <li key={item.id}>
//                 <CMSLink
//                   {...item.link}
//                   size={'clear'}
//                   className={cn('relative navLink', {
//                     active:
//                       item.link.url && item.link.url !== '/'
//                         ? pathname.includes(item.link.url)
//                         : false,
//                   })}
//                   appearance="nav"
//                 />
//               </li>
//             ))}
//           </ul>
//         ) : null}
//       </div>
//
//       <div className="flex justify-end md:w-1/3 gap-4">
//         <Suspense fallback={<OpenCartButton />}>
//           <Cart />
//         </Suspense>
//       </div>
//     </div>
//   </nav>
// </div>
