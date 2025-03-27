import React from 'react';

const FormHeader = (props: {
  heading: string;
  sub_heading: string;
  align?: 'right' | 'left' | 'center';
}) => {
  return (
    <div
      className={` ${props.align === 'left' ? 'text-start' : props.align === 'right' ? 'text-end' : 'text-center'}`}
    >
      <h3 className="text-[#1D57C7]  drop-shadow-lg text-sm lg:text-[17px] tracking-[0px] font-lato font-bold leading-[21.6px] mb-[10px]  lg:mb-[15px] 2xl:mb-[10px] ">
        {props.heading}
      </h3>
      <h4 className=" font-semibold font-lato text-[12px]  lg:text-[13px] text-[#767B81] tracking-[-0.2px] relative top-[2px] left-[2px]">
        {props.sub_heading}
      </h4>
    </div>
  );
};

export default FormHeader;
