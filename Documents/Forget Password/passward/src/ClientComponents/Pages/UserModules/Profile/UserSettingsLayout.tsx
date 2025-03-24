"use client"
import ImageTag from '@/Components/Ui/ImageTag';
import PageHeader from '@/Components/Ui/PageHeader';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowRotateLeft } from "react-icons/fa6";


const UserSettingsLayout = ({children}:{children:React.ReactNode}) => {
  const pathname = usePathname()
  const pageAction = pathname ? pathname 
  .split('/')
  .filter((data) => data !== '')
  .pop() : ""

  return (
    <div className="p-3 md:p-4 lg:p-5 2xl:px-[calc(3rem-5px)] 2xl:py-[calc(1rem-1px)] 2xl:pb-[calc(2rem+8px)] h-full grid grid-rows-[auto,1fr] gap-5">
      <div className="">
        <div>
          <div className="h-[50px] flex items-center">
            <PageHeader header="user profile" />
          </div>
          <div className="h-[135px] xl:h-[110px] 2xl:h-[135px] flex items-end w-full">
            <div className="grid text-center md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 h-[65%] lg:h-[68%] 2xl:h-[68%] lg:grid-cols-[1fr,1fr,1fr] 2xl:grid-cols-[1fr,1fr,1fr,1fr] gap-x-2 xl:gap-x-3 px-2 lg:px-[1rem] md:text-start w-full rounded-lg border">
              <div className=" row-span-2 h-full grid grid-cols-[80px,1fr] 2xl:grid-cols-[100px,1fr] gap-3">
                <div className=" relative ">
                  <div className="bg-blue-400 rounded-[50%] overflow-hidden  absolute -top-[20px] xl:-top-[30px] 2xl:-top-[37px]">
                    <ImageTag alt="image" src="/login/client.png" />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-[18px]">Catherine Smith</div>
                  <div>Principle Admin</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div>2</div>
                  <div>Email :</div>
                </div>
                <div>example@gmail.com</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div>2</div>
                  <div>Phone :</div>
                </div>
                <div className="flex gap-1">
                  <div>9994662559</div>
                  <div>ed</div>
                </div>
              </div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 rounded-lg overflow-hidden border">
        <div className=" h-full grid lg:grid-cols-[290px,1fr] xl:grid-cols-[330px,1fr] 2xl:grid-cols-[370px,1fr] gap-5">
          <div className="bg-red-100 rounded-lg overflow-hidden border">
            <div className='px-2 py-3 flex flex-col gap-2'>
              {userSettingsOptions.map((option:userSettingsOption, index:number)=>{
                return(
                  <Link href={option.link} key={index}>
                    <div className={`inline-flex px-2 py-[5px] items-center gap-2 ${ pageAction === option.link ? "bg-red-500 text-white" : "" }  rounded-md`}>
                      <div>{option.icon}</div>
                      <div>{option.name}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="bg-red-100 rounded-lg overflow-hidden border px-6 py-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsLayout;

interface userSettingsOption  {
  name: string,
  link : string,
  icon : React.ReactNode
}

export const userSettingsOptions:userSettingsOption[] = [
  {
    name: "Reset Password",
    link : "reset-password",
    icon : <FaArrowRotateLeft />
  },
  {
    name: "Tone Selection",
    link : "tone-selection",
    icon : <FaArrowRotateLeft />
  },
  {
    name: "Display Preferences",
    link : "display-preferences",
    icon : <FaArrowRotateLeft />
  },
  {
    name: "Locale Configurations",
    link : "locale-configurations",
    icon : <FaArrowRotateLeft />
  },
  {
    name: "Login Logs",
    link : "login-logs",
    icon : <FaArrowRotateLeft />
  }
]
