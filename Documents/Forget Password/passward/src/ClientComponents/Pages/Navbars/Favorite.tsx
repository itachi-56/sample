import React from 'react';
import FavoriteFilled from '@/../public/assets/icons/commonIcons/favoriteFilled';
import NoLikes from '@/../public/assets/icons/commonIcons/noLikes';
import Link from 'next/link';
import { favScreen } from '@/MockData/Pages/Navbar/Favorite';

const FavoriteModel = (props: { closeModel: () => void }) => {
  return (
    <div className="text-lg font-medium whitespace-nowrap w-[245px] ">
      <div className="flex items-center justify-between">
        <div className="text-header-popup-heading-font-size font-header-popup-heading-font-weight text-color-header-popup-heading-default-text-color hover:text-color-header-popup-heading-hover-text-color">
          Favorite screens
        </div>
        <div className="text-[20px] cursor-pointer" onClick={props.closeModel}>
          <i className="icon-close"></i>
        </div>
      </div>
      <div className="pt-3">
        {favScreen.length !== 0 ? (
          favScreen.map((data: any, i) => (
            <Link key={i} href={data.screen_link}>
              <div className="flex items-center justify-between py-[3px] ]">
                <div className="text-like-popup-font-size font-like-popup-font-weight text-color-like-popup-deafult-font-color hover:text-color-like-popup-hover-font-color">
                  {data.screen_name}
                </div>
                <div>
                  <FavoriteFilled />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-between py-[3px] ">
            <NoLikes />
            <div className="text-xl font-medium">
              Your favorites list is empty
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteModel;
