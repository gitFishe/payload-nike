'use client'
import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import Link from 'next/link'
import React, { Suspense } from 'react'

import { MobileMenu } from './MobileMenu'
import type { Header } from 'src/payload-types'

import { LogoIcon } from '@/components/icons/logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'
import Image from 'next/image'

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
        <ul>
          {column.col.map((row) => (
            <li key={row.id}>{row.ulName}</li>
          ))}
        </ul>

        {column.showCol2 && column.col2?.length ? (
          <ul>
            {column.col2.map((row) => (
              <li key={row.id}>{row.ulName}</li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  }

  return (
    <div className="bg-white relative">
      <div className="container">
        <div className="flex h-15 justify-between items-center">
          <div className="w-10 h-10 border">
            {/* eslint-disable-next-line @next/next/no-img-element,jsx-a11y/alt-text */}
            <img src={logo.url || undefined} />
          </div>

          <div className="flex text-black">
            {navItems.map((nav) => (
              <div key={nav.id}>
                <span>{nav.tabName}</span>

                {/*dropdown*/}
                <div className="absolute left-0 top-full w-full py-10 bg-red-500 flex justify-center">
                    {nav.colLinks?.map(renderColumnLinks)}
                </div>
              </div>
            ))}
          </div>
          <div></div>
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
