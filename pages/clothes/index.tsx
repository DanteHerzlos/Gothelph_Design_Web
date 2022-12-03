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

  const addCategoryHandler = () => {
    setIsModal(true);
  };

  const deleteCategoryHandler = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault()
 
    const data = await CategoryService.removeCategory(id)
    console.log(data);
    
  };

  return (
    <ClothesLayout title="КАТАЛОГ ГОТИЧЕСКОЙ ОДЕЖДЫ">
      <div className={cl.container}>
        <div className={cl.categories}>
          <EditPanel className={cl.edit_panel} onAdd={addCategoryHandler} addBtn />
          {categories &&
            categories.map((category) => (
              <Link href={"/clothes/" + category._id} key={category._id}>
                <Card
                  onDelete={e => deleteCategoryHandler(e, category._id!)}
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
