'use client'

import useLoadImage from '@/hooks/useLoadImage'
import usePlayer from '@/hooks/usePlayer'
import { PlayListItemProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const PlayListItem = ({data, onClick}:PlayListItemProps) => {
    const player = usePlayer()
    const imageUrl = useLoadImage(data)
    const handleClick = ()=>{
        if(onClick){
            return onClick(data.id)
        }
        return player.setId(data.id)
    }
  return (
    <div className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md' onClick={handleClick}>
        <div className='relative min-h-[48px] min-w-[48px] overflow-hidden'>
            <Image fill src={imageUrl || '/image/liked.png'} alt='Playlist' className='object-cover'/>
        </div>
        <div className='flex flex-col gap-y-1 overflow-hidden'>
            <p className='text-white capitalize truncate'>{data.title}</p>
            <p className='text-neutral-400  text-sm truncate'>{data.author}</p>
        </div>
    </div>
  )
}

export default PlayListItem