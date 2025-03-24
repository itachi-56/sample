import React from 'react';
import style from './style.module.css';
import ImageTag from '@/Components/Ui/ImageTag';
import { Profile } from '@/Types/Pages/Navbar/Profile';

const ProfileSlider = (props: { sliderShow: any; userData: Profile }) => {
  return (
    <div className="relative">
      <div
        id="profile-slide"
        className={`bg-white ${
          style.profile_shadow
        }  rounded-[2px] fixed h-[193px] w-[215px] z-10 top-[57px]  ${
          props.sliderShow ? style.show_slide : style.hide_slide
        }`}
      >
        <div
          className={`h-[25px] w-[25px] bg-white rotate-45 absolute -top-[8px] -z-10 right-[14px] ${style.profile_shadow}`}
        ></div>

        <div className="bg-white pb-[5px] pt-[8px] h-full">
          <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-[50%] overflow-hidden  mx-auto cursor-pointer">
            <ImageTag src={props.userData.image} alt={'user'}></ImageTag>
          </div>

          <div className="px-[38px] pt-[8px]">
            <h3 className={`text-center  ${style.profile_name}`}>
              {props.userData.name}
            </h3>
            <h5 className={` text-center pt-1 ${style.profile_email}`}>
              {props.userData.email}
            </h5>
            <hr className="mt-[8px] mb-[10px]" />
            <div className="flex flex-col gap-[15px]">
              <div className={`flex gap-4  items-center`}>
                <div className="text-[17px]">
                  <i className="icon-user"></i>
                </div>
                <h3 className={`${style.logout_profile} font-medium`}>
                  Profile
                </h3>
              </div>
              <div className="flex gap-4 items-center ">
                <div className="text-[17px]">
                  <i className="icon-logout"></i>
                </div>
                <h3 className={`${style.logout_profile} font-medium`}>
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlider;
