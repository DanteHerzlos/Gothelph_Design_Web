import Image from 'next/image';
import React from 'react'
import cl from "../styles/components/Carousel.module.sass";
import cat1 from "../public/cat-1.jpg";
import cat2 from "../public/cat-2.jpg";
import cat3 from "../public/cat-3.png";

const Carousel = () => {
  return (
    <>
      <div className={cl.container}>
        <input defaultChecked className={cl.radio_1} type="radio" id="item-1" name="slider" />
        <input className={cl.radio_2} type="radio" id="item-2" name="slider" />
        <input className={cl.radio_3} type="radio" id="item-3" name="slider" />
        <div className={cl.cards}>
          <label className={cl.card_1} htmlFor="item-1" id="card-1">
            <Image src={cat1} alt="" />
          </label>
          <label className={cl.card_2} htmlFor="item-2" id="card-2">
            <Image src={cat2} alt="" />
          </label>
          <label className={cl.card_3} htmlFor="item-3" id="card-3">
            <Image src={cat3} alt="" />
          </label>
        </div>
      </div>
    </>
  );
}

export default Carousel