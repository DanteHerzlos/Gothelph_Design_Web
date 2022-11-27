import React from "react";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import TriangleBackground from "../../components/Shapes/TriangleBackground";
import Button from "../../components/UI/Button";
import cl from '../../styles/Clothes.module.sass'

const Clothes = () => {
  return (
    <Layout title="Clothes">
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
          <Button active>Заказать инндивидуальный пошив</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Clothes;
