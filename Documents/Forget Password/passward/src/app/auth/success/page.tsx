import ImageTag from '@/Components/Ui/ImageTag';
import { Input } from "@/components/ui/input"
import FormHeader from '@/Components/Ui/FormHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import BackHome from '@/core/authentication/success';

const Page: React.FC = () => {
  return (
    <div className="grid grid-cols-1 w-full h-full lg:h-[calc(32rem-2px)] lg:w-[calc(31rem+0px)] xl:h-[calc(32rem-2px)] xl:w-[calc(31rem+0px)] 2xl:w-[calc(36rem-4px)] 2xl:h-[calc(31rem-2px)] ">
      <div className="flex flex-col justify-center  gap-7 2xl:-translate-y-3">
        <div className="flex justify-center items-center ">
          <div className="h-[90px] md:h-[100px] md:pt-4 lg:h-[104px] xl:h-[104px] 2xl:h-[104px]">
            <ImageTag src={'/login/check_marks.png'} alt={''} />
          </div>
        </div>

  
       <FormHeader 
          heading={'Password changed!'}
          sub_heading={'Password change request has been completed'}
        />
    

        <div className="flex justify-center pt-[calc(3rem-10px)]">
         <BackHome/>
        </div>
      </div>
    </div>
  );
};


export default Page;