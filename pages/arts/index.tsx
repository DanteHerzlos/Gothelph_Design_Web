import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import EditProductPanel from "@components/EditProductPanel";
import OdrerForm from "@components/forms/OdrerForm";
import ImgSplitSlider from "@components/ImgSplitSlider";
import Layout from "@components/layouts/Layout";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setProduct } from "@store/reducers/product/productSlice";
import { CategoryType } from "types/CategoryType";
import { IProduct } from "types/IProduct";
import { ICategory } from "types/ICategory";
import { setCategory } from "@store/reducers/category/categorySlice";
import EditCategoryPanel from "@components/EditCategoryPanel";
import cl from "@styles/Arts.module.sass";
import CardLightBox from "@components/CardLightBox";

interface ArtsProps {
  fetchedProducts: IProduct[];
  fetchedCategories: ICategory[];
  type: CategoryType;
}

const Arts: React.FC<ArtsProps> = ({
  fetchedProducts,
  fetchedCategories,
  type,
}) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productReducer);
  const { categories } = useAppSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(setProduct(fetchedProducts));
    dispatch(setCategory(fetchedCategories));
  }, [dispatch, fetchedProducts, fetchedCategories]);

  return (
    <Layout
      header_title="ARTS"
      title="ARTS"
      keywords="arts, рисунки, рисунки на заказ, портреты, портреты на заказ, портреты на заказ Москва, эскизы"
    >
      <>
        <div className={cl.slider}>
          <EditCategoryPanel className={cl.edit_panel} type={type} addBtn />
          <ImgSplitSlider type={type} categories={categories} />
        </div>
        <div className={cl.services}>
          <div className={cl.service_title}>
            <EditProductPanel
              category={type}
              className={cl.edit_panel}
              addBtn
            />
            <h3>ПРАЙС</h3>
          </div>

          <div className={cl.cards}>
            {products &&
              products.map((product) => (
                <div key={product._id} className={cl.cards__card}>
                  <EditProductPanel product={product} editBtn deleteBtn />
                  <CardLightBox product={product} className={cl.card} />
                </div>
              ))}
          </div>
          <div className={cl.btn}>
            <OdrerForm product_name="Арт на заказ">Сделать заказ</OdrerForm>
          </div>
        </div>
      </>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const type = context.resolvedUrl.slice(1);
  const res_cat = await fetch(process.env.API_URL + "/category?type=" + type);
  const categories = await res_cat.json();

  const res_prod = await fetch(
    process.env.API_URL + "/product?category=" + type
  );
  const products = await res_prod.json();

  return {
    props: {
      fetchedProducts: products,
      fetchedCategories: categories,
      type: type,
    },
  };
};

export default Arts;
