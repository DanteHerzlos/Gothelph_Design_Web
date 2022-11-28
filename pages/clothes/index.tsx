import React from "react";
import Card from "../../components/Card";
import ClothesLayout from "../../components/ClothesLayout";
import cl from "../../styles/Clothes.module.sass";

const Clothes = () => {
  return (
    <ClothesLayout title="КАТАЛОГ ГОТИЧЕСКОЙ ОДЕЖДЫ">
      <div className={cl.container}>
        <div className={cl.categories}>
          <Card className={cl.card} />
          <Card className={cl.card} />
          <Card className={cl.card} />
          <Card className={cl.card} />
          <Card className={cl.card} />
        </div>
      </div>
    </ClothesLayout>
  );
};

export default Clothes;
