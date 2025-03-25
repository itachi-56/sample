"use client";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/Components/Ui/password";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const route = useRouter();
  const Sucess = () => {
    route.push("/auth/success");
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-10">
        <div className="flex justify-center relative">
          <PasswordInput label="Enter Password" id="password" />
        </div>
        <div className="flex justify-center relative">
          <PasswordInput label="Confirm Password" id="confirm password" />
        </div>

        <div className="flex justify-center relative">
          <Button
            className="bg-[#1D57C7] text-[16px] text-white font-semibold w-[95] h-[38] rounded-[4px] transition-all duration-500  ease-linear cursor-pointer border border-[#1D57C7] hover:text-[#1D57C7] hover:bg-white "
            onClick={Sucess}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
