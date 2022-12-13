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
  autoServices: ICategory[];
  type: CategoryType;
}

const Auto: React.FC<AutoProps> = ({
  fetchedCategories,
  autoServices,
  type,
}) => {
  const router = useRouter();
  const rootPath = router.asPath;
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(
    categories ? categories[0] : null
  );

  useEffect(() => {
    setActiveCategory(
      categories.filter((category) => category.type === type)[0]
    );
  }, [categories, type]);

  useEffect(() => {
    dispatch(setCategory([...fetchedCategories, ...autoServices]));
  }, [dispatch, fetchedCategories, autoServices]);

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
              categories
                .filter((category) => category.type === type)
                .map((category) => (
                  <div key={category._id} className={cl.menu_btns__btn}>
                    <Link href={[rootPath, category._id].join("/")}>
                      <Button
                        className={cl.btn}
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
              type={type}
              activeCategory={activeCategory}
              categories={categories.filter(
                (category) => category.type === type
              )}
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
  const services = await CategoryService.getCategories("auto_services");
  return {
    props: { fetchedCategories: data, type: type, autoServices: services },
  };
};

export default Auto;
