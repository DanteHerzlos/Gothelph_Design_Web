import React, { ReactNode } from "react";
import Layout from "./Layout";
import cl from "../../styles/components/layouts/ClothesLayout.module.sass";
import OdrerForm from "../forms/OdrerForm";

interface ClothesLayoutProps {
  title?: string;
  children: ReactNode;
}

const ClothesLayout: React.FC<ClothesLayoutProps> = ({ title, children }) => {
  return (
    <Layout title="CLOTHES">
      <div
        style={{ backgroundImage: `url(/Triangle.svg)` }}
        className={cl.background}
      >
        <div className={cl.title}>
          <h1>{title?.toUpperCase()}</h1>
        </div>
        {children}
        <div className={cl.btn}>
          <OdrerForm product_name="Индивидуальный пошив">Заказать индивидуальный пошив</OdrerForm>
        </div>
      </div>
    </Layout>
  );
};

export default ClothesLayout;
