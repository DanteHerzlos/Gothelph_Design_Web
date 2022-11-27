import React from 'react'
import Layout from '../../../components/Layout';
import Button from '../../../components/UI/Button';
import cl from '../../../styles/ClothesItem.module.sass'

const ClothesItem = () => {
  return (
    <Layout title="CLOTHES">
      <div
        style={{ backgroundImage: `url(/Triangle.svg)` }}
        className={cl.body}
      >
        <div className={cl.title}>
          <span>Название товара</span>
        </div>
        <div className={cl.container}>
        </div>
        <div className={cl.btn}>
          <Button active>Заказать индивидуальный пошив</Button>
        </div>
      </div>
    </Layout>
  );
}

export default ClothesItem;