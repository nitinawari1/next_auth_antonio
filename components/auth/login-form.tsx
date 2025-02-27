"use client"
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
} from  "@/components/ui/form"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas/index"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import {Login} from "@/actions/login"
import {useTransition , useState} from "react"
import { useSearchParams } from "next/navigation"

export const LoginForm =()=>{
    const searchParams = useSearchParams()

    const urlError  = searchParams.get("error") === "OAuthAccountNotLinked" ? "email is aleary use with diffrent providers!" : undefined;


    const [isPending, startTransition] = useTransition()
    const [error , setError] = useState<string |undefined>("")
    const [success , setSuccess] = useState<string |undefined>("")
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""

        }
    })


 const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
    setError("")
    setSuccess("")
    startTransition(()=>{
        Login(values)
        .then((data)=>{
               setError(data?.error)
            //   setSuccess(data.success)

           
        });
    });
   
 };

         return (
   <CardWrapper 
    headerLabel="welcome back"
    backButtonLabel="Don't have a account? "
    backButtonHref="/auth/register"
    sideLinkLable="create account"
    showSocial
   >
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
         >
            <div className="space-y-4">
            <FormField 
            control={form.control}
            name="email"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                    Email
                </FormLabel>
                <FormControl>
                    <Input 
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                    />
                </FormControl>
                <FormMessage  />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="password"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                    password
                </FormLabel>
                <FormControl>
                    <Input 
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

            
            </div>
            <FormError message={error || urlError }/>
            <FormSuccess message={success}/>
         <Button
         disabled={isPending}
         type="submit"
         className = "w-full"
         >
            Login
         </Button>
         </form>
        </Form>        
   </CardWrapper>
         )
} 