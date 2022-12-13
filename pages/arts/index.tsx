import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import Card from "@components/Card";
import EditProductPanel from "@components/EditProductPanel";
import OdrerForm from "@components/forms/OdrerForm";
import ImgSplitSlider from "@components/ImgSplitSlider";
import Layout from "@components/layouts/Layout";
import ProductService from "@services/ProductService";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setProduct } from "@store/reducers/product/productSlice";
import { CategoryType } from "types/CategoryType";
import { IProduct } from "types/IProduct";
import cl from "@styles/Arts.module.sass";
import CategoryService from "@services/CategoryService";
import { ICategory } from "types/ICategory";
import { setCategory } from "@store/reducers/category/categorySlice";
import EditCategoryPanel from "@components/EditCategoryPanel";

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
    <Layout title="ARTS">
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
                  <Card
                    key={product._id}
                    src={product.imgs[0].url}
                    title={
                      product.price
                        ? product.title + " " + product.price + "₽"
                        : product.title
                    }
                    className={cl.card}
                  />
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
  const categories = await CategoryService.getCategories(type);
  const products = await ProductService.getProductsByCategory(type);

  return {
    props: {
      fetchedProducts: products,
      fetchedCategories: categories,
      type: type,
    },
  };
};

export default Arts;
