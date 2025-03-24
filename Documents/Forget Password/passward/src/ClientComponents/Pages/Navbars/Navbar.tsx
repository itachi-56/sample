import NavbarStateProvider from '@/Providers/NavbarStateProvider';
import React from 'react';
import LeftNavbarLayout from '../../../Layouts/Pages/Navbar/LeftNavbarLayout';

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavbarStateProvider>
      <LeftNavbarLayout>
        <div className="h-full w-full">{children}</div>
      </LeftNavbarLayout>
    </NavbarStateProvider>
  );
};

export default Navbar;
