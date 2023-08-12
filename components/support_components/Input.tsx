import { inputProps } from '@/types'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Input = forwardRef<HTMLInputElement,inputProps>(({
  className,
  type,
  disabled,
  ...props
},ref)=>{
  return (
    <input type={type} disabled={disabled} ref={ref} {...props} className={twMerge('p-2 flex w-full rounded-md mx-2 text-sm h-10 focus:outline-none file:border-0 disabled:cursor-not-allowed file:font-medium placeholder:text-neutral-400 disabled:opacity-50 file:bg-transparent',className)}/>
  )
})

Input.displayName = 'Input'

export default Input