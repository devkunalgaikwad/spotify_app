import { useAuthModalProps } from '@/types'
import React from 'react'
import {create} from 'zustand'

const useAuthModal = create<useAuthModalProps>((set)=>({
    isOpen : false,
    onOpen: ()=> set({isOpen:true}),
    onClose: ()=> set({isOpen : false}),
}));

export default useAuthModal