'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import NavBar from '../NavBar/NavBar';
import NavBarMD from '../NavBarMD/NavBarMD';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import Footer from '../Footer/Footer';
import NavBarXL from '../NavBarXL/NavBarXL';

const ConditionalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const hidden = pathname !== '/';

  return (
    <>
      <div className='block md:hidden'>
        {hidden && <NavBar />}
      </div>
      <div className='hidden md:block xl:hidden'>
        {hidden && <NavBarMD />}
      </div>
      <div className='hidden xl:block'>
        {hidden && <NavBarXL />}
      </div>

      <main className={hidden ? "pt-16 pb-16" : ""}>
        {children}
      </main>
      
      <div className='block 2xl:hidden'>
        {hidden && <BottomNavBar/>}
      </div>
      <div className='hidden 2xl:block'>
        <Footer />
      </div>
    </>
  );
};

export default ConditionalLayout;
