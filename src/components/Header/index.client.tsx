'use client'
import React, { useState } from 'react'

import { SearchBar } from '@/components/SearchBar'
import Link from 'next/link'
import { JordanIcon } from '@/components/icons/JordanIcon'
import { ConverseIcon } from '@/components/icons/ConverseIcon'
import { ProfileIcon } from '@/components/icons/ProfileIcon'

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

type DropdownGroup = {
  title?: {
    label: string
    url: string
  }
  links?: {
    id: string
    label: string
    url: string
  }[]
}

type Props = {
  header: {
    navItems?: NavItem[]
    searchBar: boolean
    userDropdown?: DropdownGroup
    helpDropdown?: DropdownGroup
    logo?:any
  }
}


export function HeaderClient({ header }: Props) {

  const navItems = header.navItems || []
  const userLinks = header.userDropdown?.links || []
  const helpLinks = header.helpDropdown?.links || []
  const [dropDownMenu, setDropDownMenu] = useState<'help' | 'profile' | null>(null)

  const renderColumnLinks = (column: ColumnGroup) => {
    return (
      <div key={column.id} className="px-7 w-60">
        <ul className="[&>li:first-child]:text-base text-sm [&>li:first-child]:font-semibold font-medium [&>li:first-child]:text-black text-[#737075] [&>li:first-child]:mb-1 cursor-pointer">
          {column.col.map((row) => (
            <li className="mt-2 hover:text-black" key={row.id}>
              {row.ulName}
            </li>
          ))}
        </ul>

        {column.showCol2 && column.col2?.length ? (
          <ul className="[&>li:first-child]:text-base text-sm [&>li:first-child]:font-semibold [&>li:first-child]:text-black text-[#737075] mt-10 cursor-pointer">
            {column.col2.map((row) => (
              <li className="mt-2 hover:text-black" key={row.id}>
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
    <div>
      {/*_____________________________________ SUBHEADER _____________________________________*/}

      <div className="bg-light-gray w-full">
        <div className="container">
          <div className="flex justify-between items-center h-9 text-black">
            <div className="flex gap-6">
              <Link href="/" className="w-6 h-6">
                <JordanIcon />
              </Link>

              <Link href="/" className="w-6 h-6">
                <ConverseIcon />
              </Link>
            </div>
            <div className="flex items-center text-xs h-full dividers font-semibold">
              <div className="relative px-3">
                <span>Find a Store</span>
              </div>
              <div
                onMouseLeave={() => setDropDownMenu(null)}
                onMouseEnter={() => setDropDownMenu('help')}
                className="flex items-center cursor-pointer relative h-full group px-3"
              >
                <span className="text-xs group-hover:text-[#707072]">Help</span>
                <div
                  className={`absolute w-60.25 top-full -right-5 transition-[opacity,translate] duration-300 ease-out bg-white py-3 pr-4 pl-6 ${
                    dropDownMenu === 'help'
                      ? 'translate-y-0 z-50'
                      : 'opacity-0 -translate-y-5 z-[-100]'
                  }`}
                >
                  {header.helpDropdown?.title && (
                    <Link
                      href={header.helpDropdown.title.url || ''}
                      className="text-base pb-3 block"
                    >
                      {header.helpDropdown.title.label}
                    </Link>
                  )}
                  <ul className="text-xs leading-[150%]">
                    {helpLinks.map((link: any) => (
                      <li
                        className="text-[#707072] pb-2 hover:text-black w-33.5 w-full"
                        key={link.id}
                      >
                        <Link className="w-full" href={link.url}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                onMouseLeave={() => setDropDownMenu(null)}
                onMouseEnter={() => setDropDownMenu('profile')}
                className="flex items-center cursor-pointer relative h-full group px-3"
              >
                <span className="group-hover:text-[#707072]">Hi,namespace</span>
                <div className="w-6 h-6 text-black group-hover:text-[#707072] ml-1">
                  <ProfileIcon />
                </div>
                <div
                  className={`absolute w-60.25 top-full -right-5 transition-[opacity,translate] duration-300 ease-out bg-white py-3 pr-4 pl-6 ${
                    dropDownMenu === 'profile'
                      ? 'translate-y-0 z-50'
                      : 'opacity-0 -translate-y-5 z-[-100]'
                  }`}
                >
                  {header.userDropdown?.title && (
                    <Link
                      href={header.userDropdown.title.url || ''}
                      className="text-base pb-3 block"
                    >
                      {header.userDropdown.title.label}
                    </Link>
                  )}
                  <ul className="text-xs leading-[150%]">
                    {userLinks.map((link: any) => (
                      <li className="text-[#707072] pb-2 hover:text-black w-33.5" key={link.id}>
                        <Link className="w-full block" href={link.url}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*_____________________________________ HEADER _____________________________________*/}
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
            <Link href='/test' className="w-10 h-10 border z-50">
              {/* eslint-disable-next-line @next/next/no-img-element,jsx-a11y/alt-text */}
              {/*<img src={logo.url || undefined} />*/}
            </Link>

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

            {header.searchBar ? <SearchBar additionalClasses="z-50" /> : null}
          </div>
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
