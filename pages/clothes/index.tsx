import React, { useEffect } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Card from "@components/Card";
import ClothesLayout from "@components/layouts/ClothesLayout";
import EditCategoryPanel from "@components/EditCategoryPanel";
import CategoryService from "@services/CategoryService";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setCategory } from "@store/reducers/category/categorySlice";
import { ICategory } from "types/ICategory";
import { CategoryType } from "types/CategoryType";
import cl from "@styles/Clothes.module.sass";

interface ClothesProps {
  fetchedCategories: ICategory[];
  type: CategoryType;
}

const Clothes: React.FC<ClothesProps> = ({ fetchedCategories, type }) => {
  const router = useRouter();
  const rootPath = router.asPath;
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(setCategory(fetchedCategories));
  }, [dispatch, fetchedCategories]);

  return (
    <ClothesLayout title="КАТАЛОГ ГОТИЧЕСКОЙ ОДЕЖДЫ">
      <div className={cl.container}>
        <div className={cl.categories}>
          <EditCategoryPanel type={type} className={cl.edit_panel} addBtn />
          {categories &&
            categories.map((category) => (
              <div className={cl.card_editpanel} key={category._id}>
                <EditCategoryPanel
                  type={type}
                  category={category}
                  editBtn
                  deleteBtn
                />
                <Link href={[rootPath, category._id].join("/")}>
                  <Card
                    src={category.url_img}
                    title={category.title}
                    className={cl.card}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </ClothesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const type = context.resolvedUrl.slice(1);
  const data = await CategoryService.getCategories(type);
  return { props: { fetchedCategories: data, type: type } };
};

export default Clothes;
