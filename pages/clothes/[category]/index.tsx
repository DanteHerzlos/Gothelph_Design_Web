import { useRouter } from 'next/router';
import React from 'react'
import Card from "../../../components/Card";
import ClothesLayout from '../../../components/ClothesLayout';
import cl from "../../../styles/Clothes.module.sass";

const ClothesCategory = () => {
  const router = useRouter();
  const { category } = router.query;

  
  return (
    <ClothesLayout title={"КАТАЛОГ " + category}>
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
}

export default ClothesCategory