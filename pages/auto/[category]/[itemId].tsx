import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import AutoLayout from "@components/layouts/AutoLayout";
import GallerySlider from "@components/GallerySlider";
import ItemInfo from "@components/ItemInfo";
import DeliveryInfo from "@components/DeliveryInfo";
import { IProduct } from "types/IProduct";
import { ICategory } from "types/ICategory";
import { useAppDispatch } from "@hooks/redux";
import { setCategory } from "@store/reducers/category/categorySlice";
import cl from "@styles/ProductItem.module.sass";

interface AutoItemProps {
  product: IProduct;
  autoServices: ICategory[];
}

const AutoItem: React.FC<AutoItemProps> = ({ product, autoServices }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCategory(autoServices));
  }, [dispatch, autoServices]);

  return (
    <AutoLayout title={product.title}>
      <div className={cl.body}>
        <GallerySlider imgs={product.imgs}>
          <ItemInfo product={product} />
        </GallerySlider>
      </div>
      <DeliveryInfo />
    </AutoLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.query["itemId"];
  const res = await fetch(process.env.API_URL + "/product/" + productId);
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

  return { props: { product: data, autoServices: services } };
};

export default AutoItem;
