'use client'
import React from 'react'
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { LibrayProps } from '@/types'
import useOnPlay from '@/hooks/useOnPlay' 
import useSubscribeModal from '@/hooks/useSubscribeModal'
import PlayListItem from './PlayListItem'

const Library = ({songs}:LibrayProps) => {
    const subscribeModal = useSubscribeModal()
    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const {user, subscription} = useUser()
    const onClick = ()=>{
        if (!user) {
            return authModal.onOpen()
        }
        if (!subscription){
            return subscribeModal.onOpen() 
        }
        return uploadModal.onOpen()
    };
    const onPlay = useOnPlay(songs)
  return (
    <div className='flex flex-col'>
        <div className='flex items-center justify-between px-5 pt-4'>
            <div className='inline-flex items-center gap-x-2'>
                <TbPlaylist size={26} className={'text-neutral-400'}/>
                <p className='text-neutral-400 font-medium text-md'>Your Library</p>
            </div>
            <AiOutlinePlus onClick={onClick} size={20} className={'text-neutral-400 hover:text-white transition cursor-pointer'}/>
        </div>
        <div className='flex flex-col gap-y-2 mt-4 px-3'>
            {songs.map((item)=>(
                <div key={item.id}>
                    <PlayListItem data ={item} key={item.id} onClick={(id:string)=>onPlay(id)}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Library