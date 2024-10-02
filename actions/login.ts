"use server"


import * as z  from "zod";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from 'next-auth';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';


export const Login =async (values:z.infer<typeof LoginSchema>)=>{

const validatedFields=LoginSchema.safeParse(values);


if(!validatedFields.success){
         return {error:"invalid credencials1"}
} 

const {email , password} = validatedFields.data

try {
       const res =  await signIn("credentials", {
           email,
           password,
           redirect: true, // Change to true for automatic redirection
           callbackUrl: DEFAULT_LOGIN_REDIRECT, // Specify the callback URL
         });
         
     return res
     
} catch (error) {
         if (error instanceof AuthError) {
         switch(error.type){
         case "CredentialsSignin":
                  return {error:"invalid credetials!2"}
         default:
                  return {error : "something went wrong!"}
         }     
       }
         throw error;
}
};