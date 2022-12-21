import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Link from "next/link";
import AutoLayout from "@components/layouts/AutoLayout";
import EditProductPanel from "@components/EditProductPanel";
import Card from "@components/Card";
import { IProduct } from "types/IProduct";
import { ICategory } from "types/ICategory";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setCategory } from "@store/reducers/category/categorySlice";
import { setProduct } from "@store/reducers/product/productSlice";
import cl from "@styles/Clothes.module.sass";


interface AutoCategoryProps {
  autoServices: ICategory[];
  fetchedProducts: IProduct[];
  categoryTitle: string;
}

const AutoCategory: React.FC<AutoCategoryProps> = ({
  fetchedProducts,
  autoServices,
  categoryTitle,
}) => {
  const router = useRouter();
  const rootPath = router.asPath;
  const { category } = router.query;
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(setProduct(fetchedProducts));
    dispatch(setCategory(autoServices));
  }, [dispatch, fetchedProducts, autoServices]);

  return (
    <AutoLayout
      keywords={`купить ${categoryTitle}`}
      title={"автотовары " + categoryTitle}
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
                <Link
                  as={[rootPath, product._id].join("/")}
                  href={[rootPath, product._id].join("/")}
                >
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
    </AutoLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categoryId = context.query["category"];
  const res = await fetch(process.env.API_URL + "/category/" + categoryId);
  const data = await res.json();

  const res_services = await fetch(
    process.env.API_URL + "/category?type=auto_services"
  );
  const services = await res_services.json();

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
      autoServices: services,
      fetchedProducts: data.products,
      categoryTitle: data.title,
    },
  };
};

export default AutoCategory;
