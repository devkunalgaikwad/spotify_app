'use client'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { LikeButtonProps } from '@/types'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import React,{useState, useEffect} from 'react'
import { toast } from 'react-hot-toast'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

const LikeButton = ({songId}:LikeButtonProps) => {
    const router = useRouter()
    const {supabaseClient} = useSessionContext()
    const authModal = useAuthModal()
    const {user} = useUser()
    const [isLiked, setIsLiked] = useState(false)
    useEffect(()=>{
        if (!user?.id){
            return
        }
        const fetchData = async ()=>{
            const {data, error} = await supabaseClient.from('like_songs').select('*').eq('user_id', user.id).eq('song_id',songId).single()
            if(!error && data){
                setIsLiked(true)
            }
        }
        fetchData()
    },[songId,supabaseClient,user?.id])
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart
    const handleClick =async()=>{
        if(!user){
            return authModal.onOpen()
        }
        if (isLiked){
            const {error} =await supabaseClient.from('like_songs').delete().eq('user_id',user.id).eq('song_id',songId)
            if (error){
                toast.error(error.message)
            } else{
                toast.success('Unliked')
                setIsLiked(false)
            }
        }else{
            const{error} =await supabaseClient.from('like_songs').insert({song_id : songId,user_id : user.id})
            if(error){
                toast.error(error.message)
            } else {
                setIsLiked(true)
                toast.success('Liked')
            }
        router.refresh()
        }
    }

  return (
    <button type='button' title='like' className='hover:opacity-75 cursor-pointer transition' onClick={handleClick}>
        <Icon color={isLiked ? '#22c55e':'white'} size={25}/>
    </button>
  )
}

export default LikeButton;