import React from 'react';

type ModelWraperProps = {
  children: React.ReactNode;
  align: 'center' | 'right';
  isOpen: boolean;
};

const ModelWraper: React.FC<ModelWraperProps> = ({
  children,
  align = 'right',
  isOpen = false,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className={`h-screen w-screen flex absolute z-20 left-0 top-0  ${
            align === 'right'
              ? 'justify-end'
              : align === 'center'
                ? 'justify-center items-center  backdrop-blur-sm'
                : 'justify-end'
          }`}
        >
          <div
            className={`${align === 'center' ? 'h-auto' : align === 'right' ? 'h-full' : ''} text-nowrap ease-in-out ${
              isOpen ? 'opacity-100 w-auto ' : 'w-0 opacity-50 '
            }`}
          >
            <div className=" h-full">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelWraper;
