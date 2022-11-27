import React from 'react'
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';


interface LayoutProps {
  children?: React.ReactElement | string
  title?: string
} 

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Header title={title} />
      <main>{children}</main>
      <Sidebar />
      <Footer />
    </>
  );
};

export default Layout