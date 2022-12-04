import React, { ReactNode } from "react";
import Layout from "./Layout";
import Button from "../UI/Button";
import cl from "../../styles/components/layouts/ClothesLayout.module.sass";

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
          <Button>Заказать индивидуальный пошив</Button>
        </div>
      </div>
    </Layout>
  );
};

export default ClothesLayout;
