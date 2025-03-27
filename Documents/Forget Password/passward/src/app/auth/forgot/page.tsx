import ImageTag from "@/Components/Ui/ImageTag";
import { Input } from "@/components/ui/input";
import FormHeader from "@/Components/Ui/FormHeader";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import ForgotPassword from "@/core/authentication/forgotPassword";

const Page: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 lg:gap-9 w-full h-full lg:h-[calc(32rem-2px)] lg:w-[calc(50rem+0px)] xl:h-[calc(32rem-2px)] xl:w-[calc(65rem+0px)] 2xl:w-[calc(77rem-2px)] 2xl:h-[calc(31rem-4px)] ">
      <div className="flex flex-col justify-cente md:py-3 px-2 lg:py-4 xl:py-5 lg:px-9 2xl:py-[4rem] xl:px-[5rem] 2xl:px-[calc(8rem-6px)] 2xl:translate-x-4">
        <div className="grid grid-rows-[35%,65%] grid-cols-1 h-full items-center mb-8 ">
          <div className="  h-full w-full justify-center flex items-end pb-3 lg:pb-5">
            <div className="relative bottom-[28px] right-[9px]">
            <FormHeader
              heading={"Forgot Password"}
              sub_heading={"Enter your email to reset your password"}
            />
            </div>
          </div>
          <ForgotPassword />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="w-full h-full flex justify-center items-center ">
          <div className="h-[220px] lg:h-[250px] xl:h-[270px] 2xl:h-[217px] 2xl:translate-x-[calc(-2rem+6px)] 2xl:translate-y-[-7px] relative left-[4px] bottom-[2px]">
            <ImageTag src={"/login/forgot_password.png"} alt={""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
