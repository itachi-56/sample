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
      <h3 className="text-[#1D57C7]  text-sm lg:text-[17px] font-lato font-semibold leading-[21.6px] mb-[10px] tracking-wide lg:mb-[14px] 2xl:mb-[10px] ">
        {props.heading}
      </h3>
      <h4 className=" font-medium font-lato text-[12px]  lg:text-[14px] text-[#495057] tracking-tight">
        {props.sub_heading}
      </h4>
    </div>
  );
};

export default FormHeader;
