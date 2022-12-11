import React from "react";
import cl from "../styles/components/ItemInfo.module.sass";
import { IProduct } from "../types/IProduct";
import Button from "./UI/Button";

interface ItemInfoProps {
  product: IProduct
}

const ItemInfo:React.FC<ItemInfoProps> = ({product}) => {
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
                <Button key={index} className={cl.sizes_btns__btn} white>
                  {size}
                </Button>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div>
        <Button className={cl.buy_btn} white>
          купить
        </Button>
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
