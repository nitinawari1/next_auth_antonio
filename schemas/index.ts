import * as z from "zod";

export const email = z
.string()
.email({message:"Invalid email address"})

export const username = z
.string()
.min(1 , {message:"Name is required"})



export const LoginSchema = z.object({
         email: email,
         password:z.string().min(1, { message: 'Password is required' }),
})
export const RegisterSchema = z.object({
         email: email,
         password:z.string().min(6, { message: 'Password must be 6 character long ' }),
         name:username
})