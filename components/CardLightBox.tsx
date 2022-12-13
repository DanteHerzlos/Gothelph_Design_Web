import Image from "next/image";
import React, { useState } from "react";
import { IProduct } from "types/IProduct";
import Card from "./Card";
import Lightbox from "./UI/Lightbox";
import ArrowButton from "./UI/ArrowButton";
import cl from "@styles/components/CardLightBox.module.sass";

interface CardLightBoxProps {
  product: IProduct;
  className: string;
}

const CardLightBox: React.FC<CardLightBoxProps> = ({ product, className }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
  const length = product.imgs.length;

  const onLeftClick = () => {
    setActive((prev) => (length + prev - 1) % length);
  };

  const onRightClick = () => {
    setActive((prev) => (prev + 1) % length);
  };

  return (
    <>
      <Card
        className={className}
        onClick={() => setOpen(true)}
        src={product.imgs[0].url}
        title={
          product.price
            ? product.title + " " + product.price + "₽"
            : product.title
        }
      />
      <Lightbox
        className={cl.light_box}
        open={open}
        onClose={() => setOpen(false)}
      >
        <>
          <ArrowButton
            direction="left"
            onClick={onLeftClick}
            className={cl.light_box__btn_left}
          />
          <ArrowButton
            direction="right"
            onClick={onRightClick}
            className={cl.light_box__btn_right}
          />
          <Image
            className={cl.light_box__img}
            width={1920}
            height={1080}
            src={product.imgs[active].url}
            alt={product.long_title}
          />
        </>
      </Lightbox>
    </>
  );
};

export default CardLightBox;
