import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddCategoryForm from "../../components/AddCategoryForm";
import Card from "../../components/Card";
import ClothesLayout from "../../components/ClothesLayout";
import EditPanel from "../../components/EditPanel";
import Modal from "../../components/UI/Modal";
import cl from "../../styles/Clothes.module.sass";
import { ICategory } from "../../types/ICategory";

interface ClothesProps {
  categories: ICategory[];
}

const Clothes: React.FC<ClothesProps> = ({ categories }) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const addCategoryHandle = () => {
    setIsModal(true)
  }
  
  return (
    <ClothesLayout title="КАТАЛОГ ГОТИЧЕСКОЙ ОДЕЖДЫ">
      <div className={cl.container}>
        <div className={cl.categories}>
          <EditPanel onAdd={addCategoryHandle} add edit />
          {categories &&
            categories.map((category) => (
              <Link href={"/clothes/" + category._id} key={category._id}>
                <Card
                  src={category.url_img}
                  title={category.title}
                  className={cl.card}
                />
              </Link>
            ))}
        </div>
      </div>
      {isModal && (
        <Modal onClose={() => setIsModal(false)}>
          <AddCategoryForm type={"clothes"} />
        </Modal>
      )}
    </ClothesLayout>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(
    "http:127.0.0.1:3000/api/category?type=clothes"
  );

  return { props: { categories: data.data } };
}

export default Clothes;
