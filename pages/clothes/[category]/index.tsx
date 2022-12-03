import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Card from "../../../components/Card";
import ClothesLayout from "../../../components/ClothesLayout";
import EditPanel from "../../../components/EditPanel";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ProductService from "../../../services/ProductService";
import { setProduct } from "../../../store/reducers/product/productSlice";
import cl from "../../../styles/Clothes.module.sass";
import { IProduct } from "../../../types/IProduct";

interface ClothesCategoryProps {
  fetchedProducts: IProduct[];
}

const ClothesCategory: React.FC<ClothesCategoryProps> = ({
  fetchedProducts,
}) => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const { products } = useAppSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(setProduct(fetchedProducts));
  }, [dispatch, fetchedProducts]);

  const addProductHandle = () => {};

  return (
    <ClothesLayout title={"КАТАЛОГ " + category}>
      <div className={cl.container}>
        <div className={cl.categories}>
          <EditPanel className={cl.edit_panel} onAdd={addProductHandle} addBtn />
          {products &&
            products.map((product) => (
              <Card
                key={product._id}
                title={product.title}
                src={product.imgs[0].url}
              />
            ))}
        </div>
      </div>
    </ClothesLayout>
  );
};

export async function getServerSideProps(context: any) {
  const { data } = await ProductService.getProductsByCategory(
    context.query["category"]
  );
  return { props: { fetchedProducts: null } };
}

export default ClothesCategory;
