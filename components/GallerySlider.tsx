import React, { useState } from "react";
import Image from "next/image";
import LeftIcon from "./Icons/LeftIcon";
import RightIcon from "./Icons/RightIcon";
import Lightbox from "./UI/Lightbox";
import { IImage } from "types/IImage";
import cl from "@styles/components/GallerySlider.module.sass";

interface GallerySliderProps {
  imgs: IImage[];
  children?: React.ReactNode | string;
}

const GallerySlider: React.FC<GallerySliderProps> = ({ children, imgs }) => {
  const [active, setActive] = useState<number>(0);
  const [isLightbox, setIsLightbox] = useState<boolean>(false);
  const [imgsLength, setImgsLength] = useState(imgs.length);

  const onLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setActive((prev) => (prev === 0 ? imgsLength - 1 : prev - 1));
  };

  const onRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setActive((prev) => (prev === imgsLength - 1 ? 0 : prev + 1));
  };

  return (
    <div className={cl.container}>
      <div className={cl.slider}>
        <div onClick={() => setIsLightbox(true)} className={cl.slider_img_box}>
          <Image
            sizes="99vw"
            fill
            className={cl.slider_img_box__img}
            src={imgs[active].url}
            alt=""
          />
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
            <div
              key={img.url}
              className={
                index === active
                  ? [cl.slider_tumbnails_item, cl._active].join(" ")
                  : cl.slider_tumbnails_item
              }
            >
              <Image
                fill
                sizes="25vw"
                onClick={() => setActive(index)}
                src={img.url}
                alt=""
              />
            </div>
          ))}
        </div>
        <Lightbox open={isLightbox} onClose={() => setIsLightbox(false)}>
          <Image
            width={1920}
            height={1080}
            className={cl.lightbox}
            src={imgs[active].url}
            alt=""
          />
        </Lightbox>
      </div>
      {children && <div className={cl.body}>{children}</div>}
    </div>
  );
};

export default GallerySlider;
