import { useRouter } from "next/router";
import React from "react";
import AutoLayout from "../../../components/AutoLayout";
import Card from "../../../components/Card";
import cl from "../../../styles/Clothes.module.sass";


const AutoCategory = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <AutoLayout title={"автотовары " + category}>
      <div className={cl.container}>
        <div className={cl.categories}>
          <Card className={cl.card} />
          <Card className={cl.card} />
          <Card className={cl.card} />
          <Card className={cl.card} />
          <Card className={cl.card} />
        </div>
      </div>
    </AutoLayout>
  );
};

export default AutoCategory;
