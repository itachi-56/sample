import React from 'react';

const PageHeader = ({ header }: { header: string }) => {
  return (
    <>
      <div className="uppercase text-page-title-font-size font-page-title-font-weight text-color-page-title-font-color">
        {header}
      </div>
    </>
  );
};

export default PageHeader;
