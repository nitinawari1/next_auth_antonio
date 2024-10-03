
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole} from "@prisma/client"
import authConfig from "./auth.config"
 import {db} from  "@/lib/db"
import { getUserById } from "@/data/user"
import { ExtendedUser } from "@/next-auth"
 
export  const { auth, handlers:{ GET , POST}, signIn, signOut } = NextAuth({
  callbacks:{ 
    // async signIn({user}){
    //    const existingUser = await getUserById(user.id);
    //    if(!existingUser || !existingUser.emailVerified){
    //     return false;
    //    }
    //    return true;
    // },
    async session({token , session}){
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      if(token.role && session.user){
        session.user.role = token.role as UserRole ;
      }
      

      return session;
    },
    async jwt({token }){  // this jwt callback can access the user data   and cann modify it 
      if (!token.sub) return token ;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token ;
      token.role = existingUser.role
      console.log(token)
      return token; // passing to the user 
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})