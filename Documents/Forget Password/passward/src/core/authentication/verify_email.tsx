"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";

const VerifyEmail = () => {
  const route = useRouter();
  const ChangePass = () => {
    route.push("/auth/change_password");
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-10">
        <div className="flex justify-center relative">
          <Input
            className="block font-lato px-2.5 pb-2.5 pt-4 w-[360] h-[40] text-sm text-gray-900 bg-transparent rounded-sm border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 left-[10px] z-10  bg-[#FCFDFF]  origin-[0] dark:bg-gray-900 px-2  
        peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-focus:bg-white  peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2  
        peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-[10px] peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
          >
            One Time Password
          </label>
        </div>
        <div className="flex justify-center">
          <h1 className="text-[#495057]">Resent OTP in 5.00</h1>
        </div>
        <div className="flex justify-center relative">
          <Button
            className="bg-[#1D57C7] text-[16px] text-white font-semibold w-[95] h-[38] rounded-[4px] transition-all duration-500  ease-linear cursor-pointer border border-[#1D57C7] hover:text-[#1D57C7] hover:bg-white "
            onClick={ChangePass}
          >
            Submit
          </Button>
        </div>
        <div className="flex justify-center ">
          <h1 className="text-[#495057] text-[15px] font-[400px]">
            Didn’t you receive the OTP ?
            <a href="" className="text-[#1D57C7] ml-2 font-[500px] ">
              Resend
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
