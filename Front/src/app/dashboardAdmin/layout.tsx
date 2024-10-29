import { ReactNode, Suspense } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Suspense  fallback={<div>Loading...</div>}>


    <div>
      <header></header>
      <main>{children}</main>
    </div>
    </Suspense>
  );
};

export default Layout;
