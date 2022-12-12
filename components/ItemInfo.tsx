import React, { useState } from "react";
import cl from "../styles/components/ItemInfo.module.sass";
import { IProduct } from "../types/IProduct";
import OdrerForm from "./forms/OdrerForm";
import Button from "./UI/Button";

interface ItemInfoProps {
  product: IProduct;
}

const ItemInfo: React.FC<ItemInfoProps> = ({ product }) => {
  const [activeSize, setActiveSize] = useState(-1);

  return (
    <div className={cl.body}>
      <div className={cl.title}>
        <h1>{product.title}</h1>
      </div>
      <div className={cl.price}>
        <span>{product.price} ₽</span>
      </div>
      {product.sizes && product.sizes[0] !== "" ? (
        <div className={cl.sizes}>
          <span>Размер:</span>
          <div className={cl.sizes_btns}>
            {product.sizes.length &&
              product.sizes.map((size, index) => (
                <Button
                  onClick={() => setActiveSize(index)}
                  key={index}
                  className={cl.sizes_btns__btn}
                  white={activeSize !== index}
                >
                  {size}
                </Button>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div>
        <OdrerForm
          className={cl.buy_btn}
          product_name={
            activeSize !== -1
              ? product.long_title + " " + product.sizes![activeSize]
              : product.long_title
          }
          product_price={product.price}
        >
          купить
        </OdrerForm>
      </div>
      <div className={cl.info}>
        <h3>{product.long_title}</h3>
        <br />
        <p>{product.body}</p>
      </div>
    </div>
  );
};

export default ItemInfo;
