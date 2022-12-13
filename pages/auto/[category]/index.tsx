import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Link from "next/link";
import AutoLayout from "@components/layouts/AutoLayout";
import EditProductPanel from "@components/EditProductPanel";
import Card from "@components/Card";
import { IProduct } from "types/IProduct";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setProduct } from "@store/reducers/product/productSlice";
import cl from "@styles/Clothes.module.sass";
import CategoryService from "@services/CategoryService";

interface AutoCategoryProps {
  fetchedProducts: IProduct[];
  categoryTitle: string;
}

const AutoCategory: React.FC<AutoCategoryProps> = ({
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
    <AutoLayout title={"автотовары " + categoryTitle}>
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
    </AutoLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await CategoryService.getCategoryById(
    context.query["category"] as string
  );

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

export default AutoCategory;
