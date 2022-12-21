import React, { ReactNode } from "react";
import Layout from "./Layout";
import OdrerForm from "../forms/OdrerForm";
import cl from "@styles/components/layouts/ClothesLayout.module.sass";

interface ClothesLayoutProps {
  title?: string;
  children: ReactNode;
  keywords?: string;
}

const ClothesLayout: React.FC<ClothesLayoutProps> = ({
  title,
  children,
  keywords,
}) => {
  return (
    <Layout
      header_title="CLOTHES"
      title="CLOTHES"
      keywords={
        "clothes, одежда, пошив одежды на заказ, дизайнерская одежда, " +
        keywords
      }
    >
      <div
        style={{ backgroundImage: `url(/Triangle.svg)` }}
        className={cl.background}
      >
        <div className={cl.title}>
          <h1>{title?.toUpperCase()}</h1>
        </div>
        {children}
        <div className={cl.btn}>
          <OdrerForm product_name="Индивидуальный пошив">
            Заказать индивидуальный пошив
          </OdrerForm>
        </div>
      </div>
    </Layout>
  );
};

export default ClothesLayout;
