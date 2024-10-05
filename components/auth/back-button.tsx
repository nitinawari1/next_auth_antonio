"use client"
import {Button} from "@/components/ui/button"
import Link from "next/link"
interface BackButtonProps {
   label :string
   href: string
   sideLabel?:string
}

export const BackButton =  ({
         label,
         href ,
         sideLabel
}:BackButtonProps) =>{
 return(
          
          <div className="flex  items-center justify-centre  flex-row" >
          
         <p className="flex-grow m-1 ">{label}
            </p> 
          <Button
          size="sm"
          variant="link"
         asChild
         >
         <Link  href={href}>
                  {sideLabel}
         </Link>
         </Button>

         </div>
     

 )
}        