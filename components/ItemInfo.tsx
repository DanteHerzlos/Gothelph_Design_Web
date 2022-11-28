import React from "react";
import cl from "../styles/components/ItemInfo.module.sass";
import Button from "./UI/Button";

const item = {
  title: "КИЛТ МУЖСКОЙ С КОЖАННЫМИ ВСТАВКАМИ “VALHALLA”. BLACK.",
  price: "9000 Р",
  sizes: ["XS", "M", "L"],
  info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
};

const ItemInfo = () => {
  return (
    <div className={cl.body}>
      <div className={cl.title}>
        <h3>{item.title}</h3>
      </div>
      <div className={cl.price}>
        <span>{item.price}</span>
      </div>
      {item.sizes.length ? (
        <div className={cl.sizes}>
          <span>Размер:</span>
          <div className={cl.sizes_bnts}>
            {item.sizes.map((size, index) => (
              <Button key={index} className={cl.sizes_bnts__btn} white>
                {size}
              </Button>
            ))}
          </div>
        </div>
      ): <></>}
      <div>
        <Button className={cl.buy_btn} white>
          купить
        </Button>
      </div>
      <div className={cl.info}>
        <p>
          {item.info}
        </p>
      </div>
    </div>
  );
};

export default ItemInfo;
