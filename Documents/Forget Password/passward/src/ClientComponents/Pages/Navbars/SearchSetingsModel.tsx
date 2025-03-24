import React from 'react';

const SearchSettingsModel = ({
  children,
  arrow,
}: {
  children: React.ReactNode;
  arrow: string;
}) => {
  return (
    <div
      className={`relative shadow-header-popup-shadow rounded-header-popup-radius`}
    >
      <div className="bg-header-popup-bg-color  p-4 relative z-10">
        <div>{children}</div>
      </div>
      <div>
        <div
          className={`h-[20px] w-[20px] bg-header-popup-bg-color rotate-45 -top-2 ${arrow} md:right-[40px] absolute shadow-header-popup-shadow`}
        ></div>
      </div>
    </div>
  );
};

export default SearchSettingsModel;
