import React, { useState } from "react";
import cl from "../styles/components/GallerySlider.module.sass";
import img1 from "../public/slider-1.webp";
import img2 from "../public/slider-2.jpg";
import img3 from "../public/slider-3.jpg";
import img4 from "../public/slider-4.jpg";
import LeftIcon from "./Icons/LeftIcon";
import RightIcon from "./Icons/RightIcon";
import Image from "next/image";
import Lightbox from "./UI/Lightbox";


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

const l = imgs.length

interface GallerySliderProps {  
  children?: React.ReactNode | string;
}

const GallerySlider: React.FC<GallerySliderProps> = ({children}) => {
  const [active, setActive] = useState<number>(0);
  const [isLightbox, setIsLightbox] = useState<boolean>(false);

  const onLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setActive((prev) => (prev === 0 ? l - 1 : prev - 1));
  };

  const onRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setActive((prev) => (prev === l - 1 ? 0 : prev + 1));
  };

  return (
    <div className={cl.container}>
      <div className={cl.slider}>
        <div onClick={() => setIsLightbox(true)} className={cl.slider_img_box}>
          <Image src={imgs[active].url} alt="" />
          <div className={cl.slider_img_box_btns}>
            <div onClick={(e) => onLeftClick(e)} className={cl.btn_left}>
              <LeftIcon />
            </div>
            <div onClick={(e) => onRightClick(e)} className={cl.btn_right}>
              <RightIcon />
            </div>
          </div>
        </div>
        <div className={cl.slider_tumbnails}>
          {imgs.map((img, index) => (
            <Image
              onClick={() => setActive(index)}
              key={index}
              src={img.url}
              alt=""
              className={
                index === active
                  ? [cl.slider_tumbnails_item, cl._active].join(" ")
                  : cl.slider_tumbnails_item
              }
            />
          ))}
        </div>
        {isLightbox && (
          <Lightbox onClose={() => setIsLightbox(false)}>
            <Image className={cl.lightbox} src={imgs[active].url} alt="" />
          </Lightbox>
        )}
      </div>
      {children && <div className={cl.body}>{children}</div>}
    </div>
  );
};

export default GallerySlider;
