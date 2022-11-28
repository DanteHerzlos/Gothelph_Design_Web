import React from "react";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Button from "../../components/UI/Button";
import cl from '../../styles/Clothes.module.sass'

const Clothes = () => {
  return (
    <Layout title="CLOTHES">
      <div
        style={{ backgroundImage: `url(/Triangle.svg)` }}
        className={cl.body}
      >
        <div className={cl.title}>
          <span>КАТАЛОГ ГОТИЧЕСКОЙ ОДЕЖДЫ</span>
        </div>
        <div className={cl.container}>
          <div className={cl.categories}>
            <Card className={cl.card} />
            <Card className={cl.card} />
            <Card className={cl.card} />
            <Card className={cl.card} />
            <Card className={cl.card} />
          </div>
        </div>
        <div className={cl.btn}>
          <Button>Заказать индивидуальный пошив</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Clothes;
