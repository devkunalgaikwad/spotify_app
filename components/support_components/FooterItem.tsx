import { SideBarItemProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import {twMerge} from 'tailwind-merge'

const FooterItem = ({icon:Icon,label,active,href,data}:SideBarItemProps) => {
  return (
    <Link href={href} className={twMerge('flex flex-col h-auto items-center justify-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1',active && 'text-white')}>
        <Icon size={30}/>
        <p className='font-bold w-full text-center '>
            {label} 
        </p>
    </Link>
  )
} 

export default FooterItem