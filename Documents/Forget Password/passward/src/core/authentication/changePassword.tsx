"use client";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/Components/Ui/password";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const router = useRouter();

  const password = watch("password");

  const onSubmit = (data: FormData) => {
    console.log("the password",data)
    router.push("/auth/success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>   
      <div className="grid grid-cols-1 gap-9">
     
        <PasswordInput
        
          label="New Password"
          id="password"
          register={register("password", {
            required: "Please enter a strong password",
            minLength: { value: 8, message: "Password must be at least 8 characters long" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Must include one uppercase & one special character ",
            },
          })}
          error={errors.password?.message}
          hasError={!!errors.password}
        />
<div className="relative bottom-3 ">
        <PasswordInput
          label="Confirm Password"
          id="confirmPassword"
        
          register={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Please provide the same password to proceed",
          })}
    
         
          error={errors.confirmPassword?.message}
          hasError={!!errors.confirmPassword}
        /></div>

        
        <div className="flex justify-center">
          <Button className="relative bottom-[1px] right-[1px] lg:w-[92] lg:h-[38] "
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
