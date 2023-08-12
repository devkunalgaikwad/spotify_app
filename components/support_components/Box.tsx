import { boxProps } from "@/types";
import { twMerge } from "tailwind-merge";

const Box = ({children,className}:boxProps)=>{
    return(
        <div className={twMerge('bg-neutral-900 rounded-lg h-fit w-full', className)}>
            {children}
        </div>
    )
}

export default Box;