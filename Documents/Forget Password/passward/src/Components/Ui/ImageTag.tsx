import Image from 'next/image';
import React from 'react';

const ImageTag = (props: { src: string; alt: string; className?: string }) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={1000}
      height={150}
      className={`h-full w-auto  ${props.className}`}
    ></Image>
  );
};

export default ImageTag;
