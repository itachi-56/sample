import React from 'react';

const InfoButton = ({
  icon,
  name,
  background,
  textColor,
}: {
  icon: React.ReactNode;
  name: string;
  background: string;
  textColor: string;
}) => {
  return (
    <div className={`flex justify-start`}>
      <div
        style={{ backgroundColor: background }}
        className="flex gap-3 p-[3px] px-3 rounded-[4px]  items-center justify-start duration-500"
      >
        <div>{icon}</div>
        <div
          className="text-md font-medium capitalize"
          style={{ color: textColor }}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default InfoButton;
