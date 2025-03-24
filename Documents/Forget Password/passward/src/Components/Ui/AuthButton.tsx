import React from 'react';

const AuthButton = (props: {
  btnType: 'submit' | 'reset' | 'button' | undefined;
  btnName: string;
}) => {
  return (
    <button
      type={props.btnType}
      className="bg-[#1D57C7] border-[1px] border-[#1D57C7] text-white  hover:bg-white hover:text-[#1D57C7] duration-100 rounded-[4px] font-medium text-[15px] px-[26px] py-[6px]"
    >
      {props.btnName}
    </button>
  );
};

export default AuthButton;
