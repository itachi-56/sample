"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ErrorIcon } from "@/Components/Ui/icons";

const VerifyEmail = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ otp: string }>();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const onSubmit = () => {
    router.push("/auth/change-password");
  };

  const handleResendOTP = () => {
    setTimeLeft(300); 
    setCanResend(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6 relative bottom-[13px] ">
        <div className="flex justify-center relative right-[8px] top-[2px]">
          <Input
            {...register("otp", {
              required: "OTP is required",
              minLength: { value: 4, message: "OTP must be 4 digits" },
              maxLength: { value: 4, message: "OTP must be 4 digits" },
              pattern: { value: /^[0-9]{4}$/, message: "Invalid OTP format" }
            })}
            className={`block font-lato px-2.5 pb-2.5 pt-[8px] w-full md:w-[400px] lg:w-[349px] h-[39px] text-sm text-gray-900 bg-transparent rounded-[2px] border 
              ${errors.otp ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-600"} 
              appearance-none dark:text-white text-[#495057] dark:focus:border-blue-500 
              focus:outline-none focus:ring-0 peer`}
            placeholder=" "
          />
          <label
            htmlFor="otp"
            className={`absolute text-sm duration-300 transform 
              -translate-y-4 scale-75 top-1 left-[10px] z-10  pr-[20px] pl-[5px] pt-[1px]
              bg-white/90 peer-placeholder-shown:bg-transparent peer-focus:bg-white 
              peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2  
              peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-[10px] 
              ${errors.otp ? "text-red-500 peer-focus:text-red-500" : "text-[#898E93] peer-focus:text-blue-600"} 
              text-[#898E93] peer-focus:dark:text-blue-500`}
          >
            One Time Password
          </label>
          {errors.otp && <p className="text-red-500 text-sm mt-1 absolute top-full left-0 flex space-x-1"><span className='p-1 '><ErrorIcon /></span> {errors.otp.message} </p>}
        </div>

       

        
        <div className="flex justify-center">
          <h1 className="text-[#495057] text-[14px] font-400 relative bottom-2.5 right-[16px] -tracking-normal">Resend OTP in  <span className="font-medium pl-1.5 tracking-wider text-[16px]"> {formatTime(timeLeft)}</span></h1>
        </div>

        <div className="flex justify-center">
          <Button className="relative  bottom-[1px] right-[7px] lg:h-[37px] lg:w-[92px]"
          >
            Submit
          </Button>
        </div>

        <div className="flex justify-center relative top-0.5 ">
        <h1 className="text-[#495057] text-sm lg:text-[15px] font-[400px] relative top-[3px] right-[2px]  tracking-[-0.2px]">
            Didn't you receive the OTP ?
            <a href="" className="text-[#1D57C7] ml-2 font-[500px]  ">
              Resend
            </a>
          </h1>
        </div>
      </div>
    </form>
  );
};

export default VerifyEmail;

