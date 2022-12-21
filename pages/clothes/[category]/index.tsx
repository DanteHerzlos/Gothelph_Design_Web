import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import EditProductPanel from "@components/EditProductPanel";
import ClothesLayout from "@components/layouts/ClothesLayout";
import Card from "@components/Card";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setProduct } from "@store/reducers/product/productSlice";
import { IProduct } from "types/IProduct";
import cl from "@styles/Clothes.module.sass";

interface ClothesCategoryProps {
  fetchedProducts: IProduct[];
  categoryTitle: string;
}

const ClothesCategory: React.FC<ClothesCategoryProps> = ({
  fetchedProducts,
  categoryTitle,
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
    <ClothesLayout
      keywords={`купить ${categoryTitle}`}
      title={"КАТАЛОГ " + categoryTitle}
    >
      <div className={cl.container}>
        <div className={cl.categories}>
          <EditProductPanel
            category={category as string}
            className={cl.edit_panel}
            addBtn
          />
          {products.length ? (
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
            ))
          ) : (
            <div className={cl.card}>
              <h2>В этом каталоге еще нет товаров...</h2>
            </div>
          )}
        </div>
      </div>
    </ClothesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categoryId = context.query["category"];
  const res = await fetch(process.env.API_URL + "/category/" + categoryId);
  const data = await res.json();

  if (data.notFound) {
    return {
      redirect: {
        permanent: true,
        destination: "/404",
      },
    };
  }

  return {
    props: {
      fetchedProducts: data.products,
      categoryTitle: data.title,
    },
  };
};

export default ClothesCategory;
