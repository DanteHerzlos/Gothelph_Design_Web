import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ClothesLayout from "../../../components/layouts/ClothesLayout";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ProductService from "../../../services/ProductService";
import { setProduct } from "../../../store/reducers/product/productSlice";
import cl from "../../../styles/Clothes.module.sass";
import { IProduct } from "../../../types/IProduct";
import EditProductPanel from "../../../components/EditProductPanel";

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

  return (
    <ClothesLayout title={"КАТАЛОГ " + category}>
      <div className={cl.container}>
        <div className={cl.categories}>
          <EditProductPanel className={cl.edit_panel} addBtn />
          {/* {products &&
            products.map((product) => (
              <Card
                key={product._id}
                title={product.title}
                src={product.imgs[0].url}
              />
            ))} */}
        </div>
      </div>
    </ClothesLayout>
  );
};

export async function getServerSideProps(context: any) {
  const data = await ProductService.getProductsByCategory(
    context.query["category"]
  );
  return { props: { fetchedProducts: data } };
}

export default ClothesCategory;
