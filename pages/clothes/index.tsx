import React, { useState } from "react";
import AddCategoryForm from "../../components/AddCategoryForm";
import Card from "../../components/Card";
import ClothesLayout from "../../components/ClothesLayout";
import EditPanel from "../../components/EditPanel";
import Modal from "../../components/UI/Modal";
import cl from "../../styles/Clothes.module.sass";

const Clothes = () => {
  const [isModal, setIsModal] = useState<boolean>(false)
  return (
    <ClothesLayout title="КАТАЛОГ ГОТИЧЕСКОЙ ОДЕЖДЫ">
      <div className={cl.container}>
        <div className={cl.categories}>
          <EditPanel onAdd={() =>  setIsModal(true)} add edit/>
          <Card className={cl.card} />
          <Card className={cl.card} />
          <Card className={cl.card} />
          <Card className={cl.card} />
          <Card className={cl.card} />
        </div>
      </div>
      { isModal && <Modal onClose={() => setIsModal(false)}><AddCategoryForm/></Modal>}
    </ClothesLayout>
  );
};

export default Clothes;
