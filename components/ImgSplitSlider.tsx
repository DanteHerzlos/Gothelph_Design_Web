import React, { useState } from "react";
import cl from "../styles/components/ImgSplitSlider.module.sass";
import img1 from "../public/slider-1.webp";
import img2 from "../public/slider-2.jpg";
import img3 from "../public/slider-3.jpg";
import img4 from "../public/slider-4.jpg";
import LeftIcon from "./Icons/LeftIcon";
import RightIcon from "./Icons/RightIcon";
import Image from "next/image";

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

const ImgSplitSlider = () => {
  const [active, setActive] = useState<number>(0);
  const [previous, setPrevious] = useState<number>(0);
  const [imgDirection, setImgDirection] = useState<string>(cl.down);
  const [bodyDirection, setBodyDirection] = useState<string>(cl.up);

  const onLeftClick = () => {
    setPrevious(active);
    setActive((prev) => (prev === 0 ? l - 1 : prev - 1));
    setImgDirection(cl.up);
    setBodyDirection(cl.down);
  }
  const onRightClick = () => {
    setPrevious(active);
    setActive((prev) => (prev === l - 1 ? 0 : prev + 1));
    setImgDirection(cl.down);
    setBodyDirection(cl.up);
  };

  return (
    <div className={cl.container}>
      <div className={cl.slider}>
        <div className={cl.btns}>
          <div onClick={onLeftClick} className={cl.btnLeft}>
            <LeftIcon />
          </div>
          <div onClick={onRightClick} className={cl.btnRight}>
            <RightIcon />
          </div>
        </div>

        <div className={cl.img}>
          {imgs.map((img, index) => (
            <Image
              className={
                index === active
                  ? [cl._active, imgDirection].join(" ")
                  : index === previous
                  ? [cl._prev, imgDirection].join(" ")
                  : ""
              }
              key={index}
              src={img.url}
              alt=""
            />
          ))}
        </div>
        <div className={cl.body}>
          {imgs.map((img, index) => (
            <div
              className={
                index === active
                  ? [cl._active, bodyDirection].join(" ")
                  : index === previous
                  ? [cl._prev, bodyDirection].join(" ")
                  : ""
              }
              key={index}
            >
              <p>{img.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImgSplitSlider;
