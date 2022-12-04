import Link from "next/link";
import React, { useEffect } from "react";
import Card from "../../components/Card";
import ClothesLayout from "../../components/layouts/ClothesLayout";
import EditCategoryPanel from "../../components/EditCategoryPanel";
import CategoryService from "../../services/CategoryService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCategory } from "../../store/reducers/category/categorySlice";
import { ICategory } from "../../types/ICategory";
import cl from "../../styles/Clothes.module.sass";

interface ClothesProps {
  fetchedCategories: ICategory[];
}

const Clothes: React.FC<ClothesProps> = ({ fetchedCategories }) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(setCategory(fetchedCategories));
  }, [dispatch, fetchedCategories]);

  return (
    <ClothesLayout title="КАТАЛОГ ГОТИЧЕСКОЙ ОДЕЖДЫ">
      <div className={cl.container}>
        <div className={cl.categories}>
          <EditCategoryPanel className={cl.edit_panel} addBtn />
          {categories &&
            categories.map((category) => (
              <div className={cl.card_editpanel} key={category._id}>
                <EditCategoryPanel category={category} editBtn deleteBtn />
                <Link href={"/clothes/" + category._id}>
                  <Card category={category} className={cl.card} />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </ClothesLayout>
  );
};

export async function getServerSideProps() {
  const data = await CategoryService.getCategories("clothes");
  return { props: { fetchedCategories: data } };
}

export default Clothes;
