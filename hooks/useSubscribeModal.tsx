import { useSubscribeModal } from '@/types'
import React from 'react'
import {create} from 'zustand'

const useSubscribeModal = create<useSubscribeModal>((set)=>({
    isOpen : false,
    onOpen: ()=> set({isOpen:true}),
    onClose: ()=> set({isOpen : false}),
}));

export default useSubscribeModal