'use client';
import React, { useState } from 'react';
import style from './style.module.css';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Navbar } from '@/Types/Pages/Navbar/Navbar';
import { IoIosArrowDown } from 'react-icons/io';

const LeftNavbar = (props: { navOpen: any }) => {
  const navData = useSelector((state: any) => state.navigation);

  const [navHeadings, setNavHeadings] = useState(
    Array(navData.length).fill(false)
  );
  const [hoverSubNav, setHoverSubNav] = useState(
    Array(navData.length).fill(false)
  );

  const handleOpen = (index: number) => {
    const updatedNavHeadings = navHeadings.map((_, i) =>
      i === index ? !navHeadings[i] : false
    );
    setNavHeadings(updatedNavHeadings);
  };

  const handleHoverMenu = (index: number, navOpen: boolean) => {
    if (!navOpen) {
      const updatedNavHoverHeadings = hoverSubNav.map((_, i) =>
        i === index ? !hoverSubNav[i] : false
      );
      setHoverSubNav(updatedNavHoverHeadings);
    }
  };

  return (
    <div className={`flex flex-col select-none`}>
      {navData.map((data: Navbar, index: number) => (
        <div
          key={index}
          className={`sep-weight-nav-parent-child-sep-weight px-[16px] py-[2px] sep-color-nav-parent-child-sep-color pt-[10px] `}
        >
          <div
            className={`relative h-nav-parent-child-height ${
              navHeadings[index] || hoverSubNav[index]
                ? 'bg-nav-parent-bg-selected-color rounded-md'
                : 'hover:bg-nav-parent-bg-hover-color bg-nav-parent-bg-default-color'
            }  ${props.navOpen ? 'pl-[2px]' : 'pl-[0px]'} `}
            onClick={() => {
              handleOpen(index);
            }}
            onMouseEnter={() => {
              handleHoverMenu(index, props.navOpen);
            }}
            onMouseLeave={() => {
              handleHoverMenu(index, props.navOpen);
            }}
          >
            <div className="w-full h-full overflow-hidden group">
              <div className={`flex items-center h-full cursor-pointer  `}>
                <div
                  className={`w-[42px] ${navHeadings[index] || hoverSubNav[index] ? 'icon-color-nav-icon-selected-color' : 'icon-color-nav-icon-default-color group-hover:icon-color-nav-icon-hover-color'} flex justify-center items-center `}
                >
                  <i
                    className={`${data.image} text-2xl hover:duration-200`}
                  ></i>
                </div>

                <div
                  className={`${
                    props.navOpen ? 'block' : 'hidden'
                  } flex items-center flex-1`}
                >
                  <div
                    className={` ${
                      navHeadings[index]
                        ? 'text-color-nav-parent-font-selected-color text-nav-parent-text-selected-font-size font-nav-parent-text-selected-font-weight'
                        : 'text-color-nav-parent-font-default-color group-hover:text-color-nav-parent-font-hover-color text-nav-parent-text-default-font-size group-hover-text-nav-parent-text-hover-font-size font-nav-parent-text-default-font-weight group-hover-font-nav-parent-text-hover-font-weight'
                    } ${props.navOpen ? 'w-auto' : 'w-[0px]'} flex flex-1 duration-700 `}
                  >
                    {data.heading}
                  </div>
                  {
                    <div
                      className={`text-[16px]  mr-4 ${navHeadings[index] ? 'icon-color-nav-icon-selected-color' : 'icon-color-nav-icon-default-color group-hover:icon-color-nav-icon-hover-color'} ${
                        navHeadings[index] ? 'rotate-180' : 'rotate-0'
                      }  duration-300`}
                    >
                      <IoIosArrowDown />
                    </div>
                  }
                </div>
              </div>
            </div>

            {/* hoversubNav */}
            <div
              className={`  transition-all absolute z-10 bg-nav-bg-popup-color-collapse $ ${
                hoverSubNav[index] ? '-right-[163px]' : 'right-[0px]'
              }  duration-700 -top-[0px] ${
                hoverSubNav[index] ? 'block' : 'hidden'
              } `}
              onMouseLeave={() => {
                handleHoverMenu(index, props.navOpen);
              }}
            >
              <div
                className={`${
                  !props.navOpen ? 'block ' : 'hidden'
                } flex items-center rounded-r-sm 
                text-color-nav-parent-font-selected-color
                bg-nav-parent-bg-selected-color
                text-nav-parent-text-selected-font-size
                font-nav-parent-text-selected-font-weight
                h-nav-parent-child-height`}
              >
                <div
                  className={`${
                    !props.navOpen ? 'w-[139px]' : 'w-[0px]'
                  }  text-xl pl-3 font-semibold`}
                >
                  {data.heading}
                </div>
                <div className={`text-[26px] rotate-180`}>
                  <RiArrowDropDownLine />
                </div>
              </div>

              <div
                className={` flex gap-[6px] flex-col 
                ${style.sub_menu_shadow}
                ${style.slow_open} transition-all`}
              >
                {data.sub_headings.map((subData: any, subIndex: number) => (
                  <Link key={subIndex} href={subData.link ? subData.link : '#'}>
                    <h1
                      className="h-nav-child-child-height duration-300
                      text-nav-child-text-default-font-size hover:text-nav-child-text-hover-font-size 
                      font-nav-child-text-default-font-weight hover:font--nav-child-text-hover-font-weight 
                      text-color-nav-child-font-default-color  hover:text-color-nav-child-font-hover-color  
                      hover:bg-nav-child-bg-hover-color
                      hover:pl-[22px] pl-5 py-[6px] whitespace-nowrap"
                      key={subIndex}
                    >
                      {subData.sub_heading}
                    </h1>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/*click subHeadings */}
          <div
            className={`  ${
              navHeadings[index] && props.navOpen
                ? 'block bg-nav-bg-popup-color-expand'
                : 'hidden'
            } `}
          >
            <div
              className={`flex flex-col overflow-hidden 
            
            ${style.slow_open} `}
            >
              {data.sub_headings.map((subData: any, subIndex: number) => (
                <Link
                  className="whitespace-nowrap"
                  key={subIndex}
                  href={subData.link ? subData.link : '#'}
                >
                  <h1
                    className="h-nav-child-child-height duration-300 py-[6px] 
                    bg-nav-child-bg-default-color hover:bg-nav-child-bg-hover-color 
                    text-nav-child-text-default-font-size hover:text-nav-child-text-hover-font-size 
                    font-nav-child-text-default-font-weight hover:font--nav-child-text-hover-font-weight 
                    text-color-nav-child-font-default-color hover:text-color-nav-child-font-hover-color 
                    hover:pl-[46px] pl-[45px] whitespace-nowrap" /* selected nav-child-bg-selected-color , nav-child-text-selected-font-size, nav-child-text-selected-font-weight, text-color-nav-child-font-selected-color*/
                    key={subIndex}
                  >
                    {subData.sub_heading}
                  </h1>
                </Link>
              ))}
            </div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftNavbar;
