import Image from "next/image";
import React from "react";
import cl from "../styles/components/Carousel.module.sass";
import { IImage } from "../types/IImage";

interface CarouselProps {
  imgs: IImage[]
  alt?: string
}

const Carousel: React.FC<CarouselProps> = ({ imgs, alt }) => {
  return (
    <>
      <div className={cl.carousel}>
        <input
          defaultChecked
          className={cl.radio_1}
          type="radio"
          id="item-1"
          name="slider"
        />
        <input className={cl.radio_2} type="radio" id="item-2" name="slider" />
        <input className={cl.radio_3} type="radio" id="item-3" name="slider" />
        <div className={cl.cards}>
          <label className={cl.card_1} htmlFor="item-1" id="card-1">
            <Image fill src={imgs[0].url} alt={alt || ""} />
          </label>
          <label className={cl.card_2} htmlFor="item-2" id="card-2">
            <Image fill src={imgs[1].url} alt={alt || ""} />
          </label>
          <label className={cl.card_3} htmlFor="item-3" id="card-3">
            <Image fill src={imgs[2].url} alt={alt || ""} />
          </label>
        </div>
      </div>
    </>
  );
};

export default Carousel;
