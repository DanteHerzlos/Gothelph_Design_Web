import React, { useState } from "react";
import Image from "next/image";
import img1 from "@public/slider-1.webp";
import img2 from "@public/slider-2.jpg";
import img3 from "@public/slider-3.jpg";
import img4 from "@public/slider-4.jpg";
import LeftIcon from "./Icons/LeftIcon";
import RightIcon from "./Icons/RightIcon";
import cl from "@styles/components/ImgSlider.module.sass";

const imgs = [
  {
    url: img1,
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    url: img2,
    body: "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    url: img3,
    body: "but also the leap into electronic typesetting, remaining essentially unchanged",
  },
  {
    url: img4,
    body: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
];
const l = imgs.length;

const ImgSlider = () => {
  const [active, setActive] = useState<number>(0);
  const [previous, setPrevious] = useState<number>(0);
  const [direction, setDirection] = useState<string>(cl.right);

  const onLeftClick = () => {
    setPrevious(active);
    setActive((prev) => (prev === 0 ? l - 1 : prev - 1));
    setDirection(cl.left);
  };

  const onRightClick = () => {
    setPrevious(active);
    setActive((prev) => (prev === l - 1 ? 0 : prev + 1));
    setDirection(cl.right);
  };

  return (
    <>
      <div className={cl.container}>
        <div className={cl.slider}>
          {imgs.map((img, index) => (
            <Image
              className={
                index === active
                  ? [cl._active, direction].join(" ")
                  : index === previous
                  ? [cl._prev, direction].join(" ")
                  : ""
              }
              key={index}
              src={img.url}
              alt=""
            ></Image>
          ))}
          <div onClick={onLeftClick} className={cl.btn_left}>
            <LeftIcon />
          </div>
          <div onClick={onRightClick} className={cl.btn_right}>
            <RightIcon />
          </div>
        </div>
      </div>
      <div className={cl.description}>
        {imgs.map((img, index) => (
          <p className={index === active ? cl.appear : cl.hide} key={index}>
            {img.body}
          </p>
        ))}
      </div>
    </>
  );
};

export default ImgSlider;
