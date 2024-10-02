"use server"
import bcrypt from "bcrypt"

import * as z  from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";



export const Register =async (values:z.infer<typeof RegisterSchema>)=>{
const validatedFields=RegisterSchema.safeParse(values)


if(!validatedFields.success){
         return {error:"All filed is required"}
}

 const {name , email , password }  =validatedFields.data
 const hashedPassword = await  bcrypt.hash(password ,10)

 const existingUser = await getUserByEmail(email)
 if(existingUser){
         return {error:"Email already in use"}
 }
 
 const newUser = await db.user.create({
         data:{
                  name:name,
                  email:email,
                  password:hashedPassword
         }
 })

 //todo --> send verification email token
return {success:"register successfully"}

}