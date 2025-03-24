import React from 'react';
import MuteIcon from '@/../public/assets/icons/commonIcons/muteIcon';
import ImageTag from '@/Components/Ui/ImageTag';
import { notifications } from '@/MockData/Pages/Navbar/Notification';
import { NotificationType } from '@/Types/Pages/Navbar/Notification';

const NotificationModel = (props: { closeModel: () => void }) => {
  const handleMiute = (mins: number) => {
    if (mins < 60) {
      return mins + 'm';
    } else if (mins < 1440) {
      return Math.floor(mins / 60) + 'hr';
    } else if (mins < 10080) {
      return Math.floor(mins / 1440) + 'd';
    } else if (mins < 40320) {
      return Math.floor(mins / 10080) + 'wk';
    }
  };

  return (
    <div className="text-lg font-medium whitespace-nowrap w-[270px] md:w-[291px] ">
      <div className="grid grid-cols-[auto,1fr,auto] items-center ">
        <div className="text-header-popup-heading-font-size font-header-popup-heading-font-weight text-color-header-popup-heading-default-text-color hover:text-color-header-popup-heading-hover-text-color ">
          Notifications
        </div>
        <div className="text-md font-semibold flex items-center gap-[6px] justify-end ">
          <div className="">Show unread</div>
          <div className="text-[19px] pr-1">
            <i className="icon-circle-with-check"></i>
          </div>
        </div>
        <div className="text-[20px] cursor-pointer" onClick={props.closeModel}>
          <i className="icon-close"></i>
        </div>
      </div>

      {/* json data */}
      <div className=" pt-2">
        {notifications.length !== 0 ? (
          notifications.map((data: NotificationType, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto,1fr,45px] gap-3 items-center  py-[6px] font-bold "
            >
              <div>
                <div className="h-notify-row-icon-height w-notify-row-icon-width rounded-notify-row-icon-radius overflow-hidden cursor-pointer ">
                  <div className="">
                    <ImageTag src={data.image} alt={'user'}></ImageTag>
                  </div>
                </div>
              </div>
              <div className="text-lg whitespace-normal">
                <div>
                  <span className="text-color-notify-msg-category-color text-notify-msg-category-font-size font-notify-msg-category-weight">
                    {data.head}
                  </span>
                  <span className="text-notify-msg-font-size text-color-notify-msg-default-font-color hover:text-color-notify-msg-hover-font-color font-notify-msg-font-weight">
                    {data.content}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 items-center  justify-between ">
                <div className="text-notify-time-font-size text-color-notify-time-font-color font-notify-time-font-weight">
                  {handleMiute(data.time)}
                </div>
                <div className="b">
                  {data.read_flag && (
                    <div className=" h-notify-unread-circle-height w-notify-unread-circle-widht rounded-notify-unread-circle-radius bg-notify-read-circle-bg-color"></div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[230px] gap-1 flex flex-col justify-center items-center">
            <MuteIcon />
            <div className="text-xl font-semibold text-[#889ABC7D]">
              No notification yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModel;
