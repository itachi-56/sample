import React from 'react';
import ImageTag from './ImageTag';
import Link from 'next/link';
import { IoImageOutline } from "react-icons/io5";


const OAuthLoginButton = ({ src,alt,link="#",name,onClick }: { src?: string,alt?:string,link?:string,name?:string,onClick?:(e:any)=>void }) => {
  return (
    <>
        <Link href={link}>
          <button className=" border rounded-md px-2 py-1" onClick={onClick}>
            <div className="grid grid-cols-[auto,80px] gap-2 items-center">
              <div className="h-[18px]">
              {src ? <ImageTag src={src} alt={alt ? alt : "OAuthBtn"} /> : <IoImageOutline />
            }
              </div>
              <div className='text-start'>{name ? name : "Name"}</div>
            </div>
          </button>
        </Link>
    </>
  );
};

export default OAuthLoginButton;
