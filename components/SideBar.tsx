'use client'

import { sideBarProps } from '@/types'
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'
import React,{useMemo} from 'react'
import {usePathname} from 'next/navigation'
import { Box } from './support_components'
import SideBarItem from './SideBarItem'
import Library from './Library'
import usePlayer from '@/hooks/usePlayer'
import { twMerge } from 'tailwind-merge'

const SideBar = ({children,songs}:sideBarProps) => {

    const pathname = usePathname()
    const player = usePlayer()
    const routes = useMemo(()=>[
        { 
            icon : HiHome,
            label : 'Home',
            active : pathname !== '/search',
            href : '/',
        },
        {
            icon : BiSearch,
            label : ' Search',
            active : pathname === '/search',
            href : '/search',
        },
    ], [pathname]);
return (
    <div className={twMerge('flex h-full', player.activeId && 'h-[calc(100%-68px)]')}>
        <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
            <Box>
                <div className='flex flex-col gap-y-4 px-7 py-4 '>
                    {routes.map((item)=>(
                        <SideBarItem key={item.label} {...item} />
                    ))}
                </div>
            </Box>
            <Box className='overflow-y-auto h-full'>
                <Library songs={songs}/>
            </Box>
        </div>
        <main className='h-full flex-1 overflow-y-auto md:py-2  py-0'>
            {children}
        </main>
    </div>
  )
}

export default SideBar