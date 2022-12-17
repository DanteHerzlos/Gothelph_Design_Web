import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Carousel from "@components/Carousel";
import EditProductPanel from "@components/EditProductPanel";
import OdrerForm from "@components/forms/OdrerForm";
import Layout from "@components/layouts/Layout";
import Button from "@components/UI/Button";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setProduct } from "@store/reducers/product/productSlice";
import { CategoryType } from "types/CategoryType";
import { IProduct } from "types/IProduct";
import cl from "@styles/Custom.module.sass";

interface CustomProps {
  fetchedProducts: IProduct[];
  type: CategoryType;
}

const Custom: React.FC<CustomProps> = ({ fetchedProducts, type }) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productReducer);
  const [activeProduct, setActiveProduct] = useState<IProduct | null>(
    products ? products[0] : null
  );

  useEffect(() => {
    setActiveProduct(products[0]);
  }, [products]);

  useEffect(() => {
    dispatch(setProduct(fetchedProducts));
  }, [dispatch, fetchedProducts]);

  return (
    <Layout title="Custom">
      <>
        <div className={cl.carousel_container}>
          <div className={cl.carousel_btns}>
            {activeProduct ? (
              <EditProductPanel
                product={activeProduct}
                editBtn
                deleteBtn
                category={type}
                addBtn
              />
            ) : (
              <EditProductPanel category={type} addBtn />
            )}
            <div className={cl.carousel_btns_btns}>
              {products &&
                products.map((product) => (
                  <div key={product._id} className={cl.btn}>
                    <Button
                      className={
                        product._id === activeProduct?._id ? cl._active : ""
                      }
                      white={product._id === activeProduct?._id}
                      onClick={() => setActiveProduct(product)}
                    >
                      {product.title}
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          <div className={cl.carousel}>
            {activeProduct && <Carousel imgs={activeProduct.imgs} />}
          </div>
        </div>
        <div className={cl.description_container}>
          <div className={cl.order_btn}>
            <OdrerForm product_name="Кастом">Заказать кастом</OdrerForm>
          </div>
          <div className={cl.description}>
            {activeProduct && (
              <>
                <h2>{activeProduct.long_title}</h2>
                <br />
                <p>{activeProduct.body}</p>
              </>
            )}
          </div>
        </div>
      </>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const type = context.resolvedUrl.slice(1);
  const res = await fetch(process.env.API_URL + "/product?category=" + type);
  const data = await res.json();

  return { props: { fetchedProducts: data, type: type } };
};

export default Custom;
