'use client';
import React from 'react';
import ImageTag from '@/Components/Ui/ImageTag';
import style from './style.module.css';

const LeftNavbarLogo = ({
  navIsOpen,
  setNavIsOpen,
}: {
  navIsOpen: boolean;
  setNavIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`w-[280px] px-[10px] py-[16px] flex justify-between ${style.hamburger_height} `}
    >
      <div
        className={`${
          navIsOpen ? 'block' : 'hidden'
        } flex justify-center items-center w-[154px] duration-700`}
      >
        <div className="p-3">
          <ImageTag src={'/login/cdspng.webp'} alt={'converse logo'} />
        </div>
      </div>

      <div
        className=" flex justify-center items-center w-[42px] text-[19px] "
        onClick={() => setNavIsOpen((prev: boolean) => !prev)}
      >
        <i className="icon-hamburger icon-color-nav-icon-default-color hover:icon-color-nav-icon-hover-color relative -top-1 cursor-pointer duration-200 text-nav-icon-default-size hover:text-nav-icon-hover-size"></i>
      </div>
    </div>
  );
};

export default LeftNavbarLogo;
