import React from "react";
import Card from "../../components/Card";
import ImgSplitSlider from "../../components/ImgSplitSlider";
import Layout from "../../components/layouts/Layout";
import Button from "../../components/UI/Button";
import cl from "../styles/Arts.module.sass"

const Arts = () => {
  return (
    <Layout title="ARTS">
      <>
        <div className={cl.slider}>
          <ImgSplitSlider />
        </div>
        <div className={cl.services}>
          <div className={cl.service_title}>
            <span>ПРАЙС</span>
          </div>
          <div className={cl.cards}>
            {/* <Card className={cl.card} />
            <Card className={cl.card} />
            <Card className={cl.card} /> */}
          </div>
          <div className={cl.btn}>
            <Button>Сделать заказ</Button>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Arts;
