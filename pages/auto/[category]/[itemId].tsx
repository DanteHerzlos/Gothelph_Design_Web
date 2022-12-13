import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import AutoLayout from "@components/layouts/AutoLayout";
import GallerySlider from "@components/GallerySlider";
import ItemInfo from "@components/ItemInfo";
import ProductService from "@services/ProductService";
import { IProduct } from "types/IProduct";
import CategoryService from "@services/CategoryService";
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
      <div className={cl.delivery_info}>
        <h2> ДОСТАВКА В МОСКВА</h2>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
          nulla orci. Sed sodales eros in tempus mollis. Pellentesque lobortis
          arcu at tincidunt vehicula. Integer quis eros turpis. Fusce ut porta
          massa, in tempor ex. Aliquam aliquet, tellus eu efficitur semper, odio
          dolor aliquet arcu, nec consectetur magna eros at nulla. Morbi cursus
          justo in ultrices fringilla.
        </p>
      </div>
    </AutoLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await ProductService.getProductById(
    context.query["itemId"] as string
  );
  const services = await CategoryService.getCategories("auto_services");

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
