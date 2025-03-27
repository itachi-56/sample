import ImageTag from "@/Components/Ui/ImageTag";
import { Input } from "@/components/ui/input";
import FormHeader from "@/Components/Ui/FormHeader";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import VerifyEmail from "@/core/authentication/verify_email";

const Page: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 lg:gap-9 w-full h-full lg:h-[calc(32rem-2px)] lg:w-[calc(50rem+1px)] xl:h-[calc(32rem-2px)] xl:w-[calc(65rem+0px)] 2xl:w-[calc(77rem-1px)] 2xl:h-[calc(31rem-2px)]  ">
      <div className="flex flex-col justify-cente md:py-3 px-2 lg:py-4 xl:py-5 lg:px-9 2xl:py-[4rem] xl:px-[5rem] 2xl:px-[calc(8rem-6px)] 2xl:translate-x-4 ">
        <div className="grid grid-rows-[35%,65%] grid-cols-1 h-full items-center ">
          <div className="  h-full w-full justify-center flex items-end pb-3 lg:pb-8 relative right-[9px] bottom-[12px] ">
            <FormHeader
              heading={"Verify your Email"}
              sub_heading={"Please check your Email for OTP"}
            />
           
          </div>
          <VerifyEmail />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="w-full h-full flex justify-center items-center ">
          <div className="h-[250px] lg:h-[280px] xl:h-[280px] 2xl:h-[308px] relative bottom-0.5 2xl:translate-x-[calc(-2rem+6px)] 2xl:translate-y-[-7px] pb-[43px] pr-[12px]">
            <ImageTag src={"/login/verify_email.png"} alt={""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
