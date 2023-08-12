'use client'
import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import React,{useState, useEffect} from 'react'
import Input from './Input'

const SearchInput = () => {
    const router = useRouter()
    const [value, setValue] = useState<string>('')
    const debounce = useDebounce<string>(value,500)

    useEffect(() => {
      const qurey = {
        title:debounce,
        }
      const url = qs.stringifyUrl({
        url: '/search',
        query : qurey
      })
      router.push(url)

      },[debounce, router])
    

  return (
    <Input placeholder='Get your melodies here' value={value} onChange={(e)=> setValue(e.target.value)}/>
  )
}

export default SearchInput