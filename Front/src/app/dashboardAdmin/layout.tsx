import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header></header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
