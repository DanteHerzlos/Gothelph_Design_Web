import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import AutoLayout from "@components/layouts/AutoLayout";
import ImgSplitSlider from "@components/ImgSplitSlider";
import Button from "@components/UI/Button";
import EditCategoryPanel from "@components/EditCategoryPanel";
import CategoryService from "@services/CategoryService";
import { ICategory } from "types/ICategory";
import { CategoryType } from "types/CategoryType";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setCategory } from "@store/reducers/category/categorySlice";
import cl from "@styles/Auto.module.sass";

interface AutoProps {
  fetchedCategories: ICategory[];
  type: CategoryType;
}

const Auto: React.FC<AutoProps> = ({ fetchedCategories, type }) => {
  const router = useRouter();
  const rootPath = router.asPath;
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(
    categories ? categories[0] : null
  );

  useEffect(() => {
    setActiveCategory(categories[0]);
  }, [categories]);

  useEffect(() => {
    dispatch(setCategory(fetchedCategories));
  }, [dispatch, fetchedCategories]);

  const overHandler = (category: ICategory) => {
    setActiveCategory(category);
  };

  return (
    <AutoLayout title="автотовары">
      <div className={cl.slider_menu}>
        <div className={cl.menu}>
          <EditCategoryPanel type={type} addBtn />

          <div className={cl.menu_btns}>
            {categories &&
              categories.map((category) => (
                <div key={category._id} className={cl.menu_btns__btn}>
                  <EditCategoryPanel
                    className={cl.edit_panel}
                    type={type}
                    category={category}
                    editBtn
                    deleteBtn
                  />
                  <Link href={[rootPath, category._id].join("/")}>
                    <Button
                      onMouseOver={() => overHandler(category)}
                      white={category._id === activeCategory?._id}
                    >
                      {category.title}
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        {categories && (
          <div className={cl.slider}>
            <ImgSplitSlider
              activeCategory={activeCategory}
              categories={categories}
            />
          </div>
        )}
      </div>
    </AutoLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const type = context.resolvedUrl.slice(1);
  const data = await CategoryService.getCategories(type);
  return { props: { fetchedCategories: data, type: type } };
};

export default Auto;
