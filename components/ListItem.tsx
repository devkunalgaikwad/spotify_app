'use client'

import { ListItemProps } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import {FaPlay} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'

const ListItem = ({name,href}:ListItemProps) => {
    const router = useRouter();
    const onClick = ()=>{
        router.push(href)
    }
  return (
    <button onClick={onClick} className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'>
        <div className='relative min-h-[64px] min-w-[64px]'>
            <Image fill src={'/image/liked.png'} alt='Playlist' className='object-cover'/>
        </div>
        <p className='font-medium truncate py-5'>{name}</p>
        <div className='aboslute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md rigth-5 group-hover:opacity-100 hover:scale-110'>
            <FaPlay className='text-black'/>
        </div>
    </button>
  )
}

export default ListItem