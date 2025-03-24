import { BreadcrumbsProps } from '@/Types/Ui';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumbs">
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            className={` ${index == items.length - 1 ? 'text-color-bread-font-selected-color text-bread-font-selected-size font-bread-font-selected-weight' : 'text-color-bread-font-deafult-color '} flex items-center `}
          >
            <Link className="hover:text-color-bread-font-hover-color text-bread-font-deafult-size hover:text-bread-font-hover-size font-bread-font-deafult-weight hover:font-bread-font-hover-weight" href={item.link}>
              {item.name}
            </Link>
            {index < items.length - 1 && (
              <span style={{ margin: '1px 4px', paddingTop: '4px' }}>
                {' '}
                <IoIosArrowForward />
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
