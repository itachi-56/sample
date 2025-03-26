"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ErrorIcon } from "./icons";
import { Input } from "@/components/ui/input";


interface PasswordInputProps {
  label: string;
  id: string;
  error?: string; 
  register: any; 
  hasError?:boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, error, register,hasError }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center">

<div className="relative ">
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        {...register} 
        className={`block font-lato px-2.5 pb-2.5 pt-4 w-[236px] lg:w-[360px] md:w-[278px] h-[40px] text-sm text-gray-900 bg-transparent rounded-sm border 
    ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-600"} 
    appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
    focus:outline-none focus:ring-0 peer`}
        placeholder=" "
      />
      <label
        htmlFor={id}

        className={`absolute text-sm duration-300 transform 
          -translate-y-4 scale-75 top-1 left-[10px] z-10 px-2 
          bg-white/90 peer-placeholder-shown:bg-transparent peer-focus:bg-white 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2  
          peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-[10px] 
          ${error ? "text-red-500 peer-focus:text-red-500" : "text-gray-500 peer-focus:text-blue-600"} 
          dark:text-gray-400 peer-focus:dark:text-blue-500`}
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-500 ease-linear"
      >
        <span className={`transition-opacity duration-300 ease-in-out ${showPassword ? "opacity-0" : "opacity-100"}`}>
          <EyeOff size={20} />
        </span>
        <span className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${showPassword ? "opacity-100" : "opacity-0"}`}>
          <Eye size={20} />
        </span>
        </button>
        <>
        {hasError && (
        <span className="text-red-500 text-sm mt-1 absolute top-full left-2 flex space-x-3 ">
          <ErrorIcon className="w-2 md:w-[14px] md:pt-[2px] md:pr-1   lg:pr-3 lg:size-[23px] lg:pb-[4px] "/>
        </span>
        )}
        </>
      
      <p className="text-red-500  mt-1 absolute top-full left-5 flex space-x-1 text-[9px] md:text-[11px] lg:text-sm lg:pl-1 ">{error}</p>
    </div>
  
    </div>
   
  );
};

export default PasswordInput;




