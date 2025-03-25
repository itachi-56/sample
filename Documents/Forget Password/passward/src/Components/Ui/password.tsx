"use client";


import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  label: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-[360px]">

      <input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        className="block font-lato px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-gray-900 bg-transparent rounded-sm border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />

    
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 left-[10px] z-10 bg-[#FCFDFF] origin-[0] dark:bg-gray-900 px-2  
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-focus:bg-white peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2  
          peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-[10px] peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 ease-in-out hover:text-blue-500"
      >
        <span className={`transition-opacity duration-300 ease-in-out ${showPassword ? "opacity-0" : "opacity-100"}`}>
          <Eye size={20} />
        </span>
        <span className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${showPassword ? "opacity-100" : "opacity-0"}`}>
          <EyeOff size={20} />
        </span>
      </button>
    </div>
  );
};

export default PasswordInput;
