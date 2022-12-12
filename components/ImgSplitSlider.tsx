import React, { useEffect, useState } from "react";
import LeftIcon from "./Icons/LeftIcon";
import RightIcon from "./Icons/RightIcon";
import Image from "next/image";
import { ICategory } from "types/ICategory";
import cl from "@styles/components/ImgSplitSlider.module.sass";

interface ImgSplitSliderProps {
  categories: ICategory[];
  activeCategory?: ICategory | null;
}

const ImgSplitSlider: React.FC<ImgSplitSliderProps> = ({
  activeCategory,
  categories,
}) => {
  const [active, setActive] = useState<number>(0);
  const [previous, setPrevious] = useState<number>(categories.length - 1);
  const [imgDirection, setImgDirection] = useState<string>(cl.down);
  const [bodyDirection, setBodyDirection] = useState<string>(cl.up);

  useEffect(() => {
    if (activeCategory) setActive(categories.indexOf(activeCategory));
  }, [activeCategory, categories]);

  const onLeftClick = () => {
    setPrevious(active);
    setActive((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
    setImgDirection(cl.up);
    setBodyDirection(cl.down);
  };
  const onRightClick = () => {
    setPrevious(active);
    setActive((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
    setImgDirection(cl.down);
    setBodyDirection(cl.up);
  };

  return (
    <div className={cl.container}>
      <div className={cl.slider}>
        <div className={cl.btns}>
          <div onClick={onLeftClick} className={cl.btn_left}>
            <LeftIcon />
          </div>
          <div onClick={onRightClick} className={cl.btn_right}>
            <RightIcon />
          </div>
        </div>

        <div className={cl.img}>
          {categories.map((category, index) => (
            <Image
              fill
              className={
                index === active
                  ? [cl._active, imgDirection].join(" ")
                  : index === previous
                  ? [cl._prev, imgDirection].join(" ")
                  : ""
              }
              key={index}
              src={category.url_img}
              alt=""
            />
          ))}
        </div>
        <div className={cl.body}>
          {categories.map((category, index) => (
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
              <h2>{category.title}</h2>
              <br />
              <p>{category.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImgSplitSlider;
