import React, { ReactNode } from "react";
import Image from "next/image";
import Layout from "./Layout";
import Card from "../Card";
import divider from "@public/autoDivider.jpg";
import EditCategoryPanel from "@components/EditCategoryPanel";
import { useAppSelector } from "@hooks/redux";
import cl from "@styles/components/layouts/AutoLayout.module.sass";
import OdrerForm from "@components/forms/OdrerForm";

interface AutoLayoutProps {
  title?: string;
  children?: ReactNode;
}

const AutoLayout: React.FC<AutoLayoutProps> = ({ title, children }) => {
  const { categories } = useAppSelector((state) => state.categoryReducer);
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
          <Image priority src={divider} alt="" />
        </div>
        {children}
        <div className={cl.services}>
          <h2 className={cl.services__title}>УСЛУГИ АВТОАТЕЛЬЕ</h2>
          <div className={cl.services__cards}>
            <EditCategoryPanel
              className={cl.services__cards__edit_panel}
              addBtn
              type={"auto_services"}
            />
            {categories
              .filter((category) => category.type === "auto_services")
              .map((service) => (
                <div key={service._id} className={cl.services__cards__card}>
                  <EditCategoryPanel
                    type={"auto_services"}
                    category={service}
                    editBtn
                    deleteBtn
                  />
                  <OdrerForm product_name={service.title} product_price={service.body}>
                    <Card
                      title={service.title}
                      src={service.url_img}
                      className={cl.card}
                    ></Card>
                  </OdrerForm>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AutoLayout;
