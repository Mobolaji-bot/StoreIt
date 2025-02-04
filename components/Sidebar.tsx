"use client"
import { usePathname } from "next/navigation"
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import {  navItems } from '@/constant'
import { cn } from '@/lib/utils'

interface Props  {
  FullName: string;
  email: string;
  avatar: string
}
const Sidebar = ({FullName, email, avatar}: Props) => {
 const pathname = usePathname()
  return (
   <aside className="sidebar">
    <Link href="/">
       <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={160} height={50} className="hidden h-auto md:block" />
       <Image src="/assets/icons/logo-full.svg" alt="logo" width={100} height={104} className=" md:hidden" />
    </Link>

    <nav className='sidebar-nav'>
      <ul className='flex flex-1 flex-col gap-6'>
        {navItems.map(({url, title , icon}) => (
          
           <Link key={title} href={url} className='md:w-full'>
          <li className={cn("sidebar-nav-item", pathname === url && "shad-active")}>
            <Image src={icon} alt={title} width={24} height={24} className={cn("nav-icon", pathname === url && "nav-icon-active")} />
            <p className="hidden lg:block">{title}</p>
          </li>
          </Link>
           ))}
      </ul>
    </nav>

    <Image src="/assets/images/files-2.png" alt="files" className="w-full" width={506} height={418} />

    <div className="sidebar-user-info">
         <Image src={avatar} alt="Avatar" width={44} height={44} className="sidebar-user-avatar"/>

         <div className="hidden md:block">
           <p className="subtitle-2 capitalize ">{FullName}</p>
           <p className="caption">{email}</p>
         </div>
    </div>
   </aside>
  )
}

export default Sidebar
