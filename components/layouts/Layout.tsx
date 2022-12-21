import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "../Sidebar";
import Head from "next/head";

interface LayoutProps {
  children?: React.ReactElement | string;
  title?: string;
  header_title?: string;
  keywords?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header_title,
  title,
  keywords,
  description,
}) => {
  return (
    <>
      <Head>
        <title>Gothelph Design {title && " | " + title}</title>
        <meta name="keywords" content={"gothelph, design, " + keywords}></meta>
        <meta name="description" content={"" + description}></meta>
        <meta charSet="utf-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Header title={header_title} />
      <main>{children}</main>
      <Sidebar />
      <Footer />
    </>
  );
};

export default Layout;
