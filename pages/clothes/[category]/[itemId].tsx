import React from "react";
import { GetServerSideProps } from "next";
import ClothesLayout from "@components/layouts/ClothesLayout";
import GallerySlider from "@components/GallerySlider";
import ItemInfo from "@components/ItemInfo";
import DeliveryInfo from "@components/DeliveryInfo";
import { IProduct } from "types/IProduct";
import cl from "@styles/ProductItem.module.sass";

interface ClothesItemProps {
  product: IProduct;
}

const ClothesItem: React.FC<ClothesItemProps> = ({ product }) => {
  return (
    <ClothesLayout
      keywords={`купить ${product.title}, ${product.title}, цена ${product.title}, ${product.long_title}`}
      title={product.title}
    >
      <div className={cl.body}>
        <GallerySlider imgs={product.imgs}>
          <ItemInfo product={product} />
        </GallerySlider>
      </div>
      <DeliveryInfo />
    </ClothesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.query["itemId"];
  const res = await fetch(process.env.API_URL + "/product/" + productId);
  const data = await res.json();

  if (data.notFound) {
    return {
      redirect: {
        permanent: true,
        destination: "/404",
      },
    };
  }
  return { props: { product: data } };
};

export default ClothesItem;
