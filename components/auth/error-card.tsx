import { CardWrapper } from "@/components/auth/card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export const ErrorCard = () =>{
         return (  
                  <CardWrapper 
                           headerLabel="! OOPS someting went wrong " 
                           backButtonLabel=""
                           backButtonHref="/auth/login"
                           sideLinkLable="back to login"
                           
                >
                  <div className="w-full  flex justify-center items-center ">
                          <ExclamationTriangleIcon  className= "text-destructive" /> 
                  </div>
                            
                  </CardWrapper>
         );

};

