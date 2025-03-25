import React from 'react';
import style from './Style.module.css';
import ImageTag from '@/Components/Ui/ImageTag';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`h-screen bg-white md:bg-[#FAFBFF] overflow-hidden`}>
      <div
        className={`h-full ${style.auth_background} bg-cover 2xl:bg-contain w-full grid grid-rows-[80px,1fr,60px] 2xl:grid-rows-[80px,1fr,200px]`}
      >
        <div className=" flex space-x-3 mt-6">
          <div className=" pl-3 h-[25px] md:pl-4  md:h-[26px] xl:h-[25px]  lg:pl-[40px] lg:pt-1 ">
            <ImageTag src={'/image/admin.svg'}  alt={'Admin Logo'} className='lg:h-[15]'/> 
            
          </div>
          <h1 className='text-[#1D57C7] text-[19px] md:text-[19px] lg:text-[16px] font-extrabold mb-0.5   ' >ADMIN</h1>
        </div>

        <div className="flex justify-center items-center h-full w-full p-4 lg:p-0 md:px-[4rem]">
          <div className="w-full h-full md:w-auto md:h-auto ">
            <div className={` bg-transparent  relative z-10 w-full h-full pb-20`}>
              <div
                className={` relative ${style.gradient_border} z-20 w-full h-full `}
              >
                <div
                  className={`h-full w-full backdrop-blur-xl ${style.content} px-[1rem] py-2`}
                >
                  {children}
                </div>
              </div>

              <div className="absolute top-0 grid grid-rows-[30%,50%,20%] h-full w-full z-0 ">
                <div className="relative px-1 hidden md:block">
                  <div className="absolute  h-[8rem] top-1 -left-[57px]">
                    <ImageTag
                      src={'/login/Ellipse_bottom_right.png'}
                      alt={'ball-1'}
                    />
                  </div>
                </div>

                <div className="relative hidden md:block">
                  <div className="absolute -bottom-4 -right-[74px] h-[calc(11rem-10px)]">
                    <ImageTag
                      src={'/login/Ellipse_bottom_right.png'}
                      alt={'ball-2'}
                    />
                  </div>
                </div>

                <div className="relative hidden md:block">
                  <div className="absolute h-[7rem] -bottom-[40px] mb-20 right-[4rem] md:right-[8rem] 2xl:right-[calc(13rem-0px)] 2xl:-bottom-[56px] ">
                    <ImageTag
                      src={'/login/Ellipse_bottom_right.png'}
                      alt={'ball-3'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" p-1 text-center text-[14px]  text-[#4E73BD] leading-5 flex flex-col justify-center md:p-2 md:px-3 md:flex-row md:justify-center md:items-end lg:p-3 lg:text-[14px] lg:px-6 lg:tracking-wide">
          <div>
            Copyright ©2024, Converse Data Solutions.All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
