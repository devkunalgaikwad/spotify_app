'use client'

import { LikeButton, PlayListItem } from '@/components/index'
import useOnPlay from '@/hooks/useOnPlay'
import usePlayer from '@/hooks/usePlayer'
import { useUser } from '@/hooks/useUser'
import { LikedContentProps } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const LikedContent = ({songs}:LikedContentProps) => {
    const router = useRouter()
    const onPlay = useOnPlay(songs)
    const {isLoading, user} = useUser()
    useEffect(()=>{
        if (!isLoading && !user){
            router.replace('/')
        }
    },[isLoading, user, router])
    if(songs.length ===0){
        return(
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                No Liked Songs...!
            </div>
        )
    }
  return (
    <div className='flex flex-col gap-y-2 w-full p-6'>
        {songs.map((song)=>(
            <div key={song.id} className='flex items-center gap-x-4 w-full'>
                <div className='flex-1'>
                    <PlayListItem onClick={(id:string)=>{onPlay(id)}} data={song}/>
                </div>
                <LikeButton songId={song.id}/>
            </div>
        ))}
    </div>
  )
}

export default LikedContent