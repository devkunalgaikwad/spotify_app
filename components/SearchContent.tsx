'use client'
import { SearchContentProps } from '@/types'
import React from 'react'
import { LikeButton, PlayListItem } from './index'
import useOnPlay from '@/hooks/useOnPlay'

const SearchContent = ({songs}:SearchContentProps) => {
    const onPlay = useOnPlay(songs)
    if (songs.length ===0){
        return(
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                No song found.
            </div>
        )
    }
  return (
    <div className='flex flex-col gap-y-2 w-full px-6'>
        {songs.map((song)=>(
            <div key={song.id} className='w-full flex items-center gap-x-4'>
                <div className='flex-1'>                    
                    <PlayListItem onClick={(id:string)=>onPlay(id)} data={song}/>
                </div>
                <LikeButton songId={song.id}/>
            </div>
        ))}
    </div>
  )
}

export default SearchContent