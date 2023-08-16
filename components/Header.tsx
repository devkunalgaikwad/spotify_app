'use client'

import { HeaderProps } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import {twMerge} from 'tailwind-merge'
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { Button } from './support_components'
import useAuthModal from '@/hooks/useAuthModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/useUser'
import { FaUserAlt } from 'react-icons/fa'
import {toast} from 'react-hot-toast'
import usePlayer from '@/hooks/usePlayer'

const Header = ({children,className}:HeaderProps) => {
    const authModal = useAuthModal()
    const router = useRouter()
    const player = usePlayer()
    const supabaseClient = useSupabaseClient()
    const {user}= useUser()

    const handleLogout = async()=>{
        const {error} = await supabaseClient.auth.signOut()
        player.reset()
        
        router.refresh()
        if (error){
            toast.error(error.message)
        } else{
            toast.success('Logged out!')
        }
    } 
  return (
    <div className={twMerge('h-fit bg-gradient-to-b from-emerald-800 p-6',className)}>
        <div className='w-full mb-4 flex items-center justify-between'>
            <div className='hidden md:flex gap-x-2 items-center'>
                <button title='back' type='button' onClick={()=> router.back()} className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                    <RxCaretLeft size={35} className={'text-white'}/>
                </button>
                <button type='button' title='forward' onClick={()=> router.forward()} className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                    <RxCaretRight size={35} className={'text-white'}/>
                </button>
            </div>
            <h1 className=' flex md:hidden  text-white font-bold text-[28px]'>
                Spotify
            </h1>
            <div className='flex justify-between items-center gap-x-4'>
               {user ? (
                <div className='flex gap-x-4 items-center'>
                    <Button onClick={handleLogout} className='font-bold px-7 py-2 bg-neutral-100' >
                        Logout 
                    </Button>
                    <Button className='hidden md:flex' onClick={()=>router.push('/account')}>
                        <FaUserAlt/>
                    </Button>
                </div>
               ):(
                <>
                    <div>
                        <Button onClick={authModal.onOpen} className='bg-transparent text-neutral-300 font-medium'>
                            Sign Up
                        </Button>
                    </div>
                    <div>
                        <Button onClick={authModal.onOpen} className='bg-white px-6 py-2'>
                            Log in
                        </Button>
                    </div>
                </>
               )} 
            </div>
        </div>
        {children}
    </div>
  )
}

export default Header