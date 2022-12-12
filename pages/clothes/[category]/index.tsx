import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import EditProductPanel from "@components/EditProductPanel";
import ClothesLayout from "@components/layouts/ClothesLayout";
import Card from "@components/Card";
import ProductService from "@services/ProductService";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setProduct } from "@store/reducers/product/productSlice";
import { IProduct } from "types/IProduct";
import cl from "@styles/Clothes.module.sass";

interface ClothesCategoryProps {
  fetchedProducts: IProduct[];
}

const ClothesCategory: React.FC<ClothesCategoryProps> = ({
  fetchedProducts,
}) => {
  const router = useRouter();
  const rootPath = router.asPath;
  const { category } = router.query;
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(setProduct(fetchedProducts));
  }, [dispatch, fetchedProducts]);

  return (
    <ClothesLayout title={"КАТАЛОГ " + category}>
      <div className={cl.container}>
        <div className={cl.categories}>
          <EditProductPanel
            category={category as string}
            className={cl.edit_panel}
            addBtn
          />
          {products &&
            products.map((product) => (
              <div className={cl.card_editpanel} key={product._id}>
                <EditProductPanel product={product} editBtn deleteBtn />
                <Link href={[rootPath, product._id].join("/")}>
                  <Card
                    title={product.title}
                    src={product.imgs[0].url}
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
  const data = await ProductService.getProductsByCategory(
    context.query["category"] as string
  );
  return { props: { fetchedProducts: data } };
};

export default ClothesCategory;
