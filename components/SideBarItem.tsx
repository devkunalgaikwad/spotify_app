import { SideBarItemProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import {twMerge} from 'tailwind-merge'

const SideBarItem = ({icon:Icon,label,active,href}:SideBarItemProps) => {
  return (
    <Link href={href} className={twMerge('flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1',active && 'text-white')}>
        <Icon size={30}/>
        <p className='trucate font-bold w-full'>
            {label}
        </p>
    </Link>
  )
}

export default SideBarItem