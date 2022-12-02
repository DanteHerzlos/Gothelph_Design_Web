import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddCategoryForm from "../../components/AddCategoryForm";
import Card from "../../components/Card";
import ClothesLayout from "../../components/ClothesLayout";
import EditPanel from "../../components/EditPanel";
import Modal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CategoryService from "../../services/CategoryService";
import { setCategory } from "../../store/reducers/category/categorySlice";
import cl from "../../styles/Clothes.module.sass";
import { ICategory } from "../../types/ICategory";

interface ClothesProps {
  fetchedCategories: ICategory[];
}

const Clothes: React.FC<ClothesProps> = ({ fetchedCategories }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(setCategory(fetchedCategories));
  }, [dispatch, fetchedCategories]);

  const addCategoryHandle = () => {
    setIsModal(true);
  };

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
  const { data } = await CategoryService.getCategories("clothes");
  return { props: { fetchedCategories: data } };
}

export default Clothes;
