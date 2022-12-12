import React, { ReactNode } from "react";
import Image from "next/image";
import Layout from "./Layout";
import Card from "../Card";
import divider from "@public/autoDivider.jpg";
import cl from "@styles/components/layouts/AutoLayout.module.sass";

interface AutoLayoutProps {
  title?: string;
  children?: ReactNode;
}

const AutoLayout: React.FC<AutoLayoutProps> = ({ title, children }) => {
  return (
    <Layout title="AUTO">
      <div
        style={{ backgroundImage: `url(/AutoTriangle.svg)` }}
        className={cl.background}
      >
        <div className={cl.title}>
          <h1>{title?.toUpperCase()}</h1>
        </div>
        <div className={cl.img_divider}>
          <Image src={divider} alt="" />
        </div>
        {children}
        <div className={cl.services}>
          <h2 className={cl.services_title}>УСЛУГИ АВТОАТЕЛЬЕ</h2>
          <div className={cl.services_cards}>
            {/* <Card className={cl.card} />
            <Card className={cl.card} /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AutoLayout;
