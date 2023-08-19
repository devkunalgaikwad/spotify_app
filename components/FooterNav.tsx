'use client'
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import {usePathname, useRouter} from 'next/navigation'
import {MdAccountCircle} from 'react-icons/md'
import { Box } from './support_components'
import {VscLibrary} from 'react-icons/vsc'
import FooterItem from './support_components/FooterItem'

const FooterNav = () => {
    const pathname = usePathname()
    const routes = useMemo(()=>[
        { 
            icon : HiHome,
            label : 'Home',
            active : pathname === '/',
            href : '/',
        },
        {
            icon : BiSearch,
            label : 'Search',
            active : pathname === '/search',
            href : '/search',
        },
        {
            icon : VscLibrary,
            label : 'Library',
            active : pathname === '/library',
            href : '/library',
        },
        {
            icon : MdAccountCircle,
            label : 'Account',
            active : pathname === '/account',
            href : '/account',
        }
    ], [pathname]);
  return ( 
    <Box className='fixed bottom-0 md:hidden'>
        <div className='flex flex-1 gap-y-4 px-2 py-2 '>
            {routes.map((item)=>(
                <FooterItem key={item.label} {...item} />
            ))}
        </div>
    </Box>
  )
}

export default FooterNav