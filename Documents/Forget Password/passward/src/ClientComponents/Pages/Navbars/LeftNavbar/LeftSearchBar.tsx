import React from 'react';
import Hamburger from '@/../public/assets/icons/commonIcons/hamburger';
import style from './style.module.css';
import Search from '../Search';
import SearchSettingsLayout from '../../../../Layouts/Pages/Navbar/SearchSettingsLayout';

const LeftSearchBar = ({
  setNavOpen,
}: {
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="h-full text-[#889ABC]">
      <div className="h-full grid grid-cols-[42px_auto_170px]  md:grid-cols-[auto_205px] ">
        <div
          className={`w-[42px] h-full md:hidden flex justify-center items-center text-[19px]  ${style.nav_shadow}`}
          onClick={() => {
            setNavOpen((prev: any) => !prev);
          }}
        >
          <Hamburger />
        </div>
        <div className=" pl-[10px]  md:pl-[25px] flex items-center">
          <Search showInput={true} />
        </div>

        <div className="flex items-center justify-end pr-[13px] md:pr-[25px] text-[23px] gap-2 ">
          <SearchSettingsLayout />
        </div>
      </div>
    </div>
  );
};

export default LeftSearchBar;
