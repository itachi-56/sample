"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import React from 'react';
import { ErrorIcon } from '../../Components/Ui/icons'




const ForgotPass=() =>{
  const route=useRouter();

const {register,handleSubmit,formState: { errors }} =useForm<
{email:"string"},
{className:"string"}
>()
const SendMail=(data:any)=>{
console.log("Email",data)
route.push("/auth/verify-email")

}


  return (
    
    
<div className='grid grid-cols-1 gap-10'> 
<form onSubmit={handleSubmit(SendMail)}> 
 <div className='flex justify-center relative' >  
 <Input  
  className={`block font-lato px-2.5 pb-2.5 pt-4 w-full md:w-[400px] h-[40px] text-sm text-gray-900 bg-transparent rounded-sm border 
    ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-600"} 
    appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
    focus:outline-none focus:ring-0 peer`}
  placeholder=" "  
  id="email"
  {...register("email", { 
    required: "E-mail is required",  
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,  
      message: "Invalid email format" 
    }
  })}
/>


<label  
  className={`absolute text-sm duration-300 transform 
    -translate-y-4 scale-75 top-1 left-[10px] z-10 px-2 
    bg-white/90 peer-placeholder-shown:bg-transparent peer-focus:bg-white 
    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2  
    peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-[10px] 
    ${errors.email ? "text-red-500 peer-focus:text-red-500" : "text-gray-500 peer-focus:text-blue-600"} 
    dark:text-gray-400 peer-focus:dark:text-blue-500`}>
  E-mail
</label>
  
   {errors.email && <p className="text-red-500 text-sm mt-1 absolute top-full left-0 flex space-x-1"><span className='p-1 '><ErrorIcon /></span> {errors.email.message} </p>}


  
  
    

    
  
</div>
  <div className='flex justify-center relative pt-10'>  
      <Button>Reset</Button>
      </div>
 </form> 

<div className="flex justify-center ">
          <h1 className="text-[#495057] text-sm lg:text-[15px] font-[400px]">
            Remember?
            <a href="" className="text-[#1D57C7] ml-2 font-[500px] ">
              Log In
            </a>
          </h1>
        </div>

 
 </div>
 

  )
}

export default ForgotPass