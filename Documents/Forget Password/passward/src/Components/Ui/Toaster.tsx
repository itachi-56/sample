import React from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { VscError } from 'react-icons/vsc';

const Toaster = ({
  type,
  message,
  open,
}: {
  open: boolean;
  type: 'success' | 'failure';
  message: string;
}) => {
  return (
    <div className="relative p-toster-gap-size">
      {open && (
        <div
          className={`absolute ${type === 'success' ? 'text-green-600' : 'text-red-500'} flex gap-2 text-md justify-center items-center`}
        >
          <div>{type === 'success' ? <FaRegCircleCheck /> : <VscError />}</div>
          <div>{message}</div>
        </div>
      )}
    </div>
  );
};

export default Toaster;
