'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar/Navbar';
// import Footer from '@/components/Footer/Footer';

const ConditionalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  
  const hidden = pathname !== '/';

  return (
    <>
      {hidden && <Navbar />}
      <main className={hidden ? "pt-16 pb-16" : ""}>
        {children}
      </main>
      {/* {hidden && <Footer />} */}
    </>
  );
};

export default ConditionalLayout;
