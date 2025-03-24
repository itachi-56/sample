import React from 'react';
import HelpFeedback from '@/../public/assets/icons/commonIcons/helpFeedback';

const HelpModel = () => {
  return (
    <div className="text-lg font-medium whitespace-nowrap w-[107px] ">
      <div className="flex items-center justify-between py-1">
        <div>
          <HelpFeedback />
        </div>
        <div className="text-help-popup-text-font-size font-help-popup-text-font-weight text-color-help-popup-text-default-font-color hover:text-color-help-popup-text-default-hover-color">
          Feedback
        </div>
      </div>
      <div className="flex items-center justify-between py-1">
        <div>
          <HelpFeedback />
        </div>
        <div className="text-help-popup-text-font-size font-help-popup-text-font-weight text-color-help-popup-text-default-font-color hover:text-color-help-popup-text-default-hover-color">
          Feedback
        </div>
      </div>
    </div>
  );
};

export default HelpModel;
