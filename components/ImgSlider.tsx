import React, { useState } from "react";
import Image from "next/image";
import EditCategoryPanel from "./EditCategoryPanel";
import ArrowButton from "./UI/ArrowButton";
import { ICategory } from "types/ICategory";
import { CategoryType } from "types/CategoryType";
import cl from "@styles/components/ImgSlider.module.sass";

interface ImgSliderProps {
  categories: ICategory[];
  type: CategoryType;
}

const ImgSlider: React.FC<ImgSliderProps> = ({ categories, type }) => {
  const l = categories.length;
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
        {categories.length !== 0 && (
          <EditCategoryPanel
            type={type}
            category={categories[active]}
            editBtn
            deleteBtn
          />
        )}
        <div className={cl.slider}>
          {categories.map((category, index) => (
            <Image
              fill
              className={
                index === active
                  ? [cl._active, direction].join(" ")
                  : index === previous
                  ? [cl._prev, direction].join(" ")
                  : ""
              }
              key={category._id}
              src={category.url_img}
              alt={category.title}
            ></Image>
          ))}
          <ArrowButton
            direction="left"
            onClick={onLeftClick}
            className={cl.btn_left}
          />
          <ArrowButton
            direction="right"
            onClick={onRightClick}
            className={cl.btn_right}
          />
        </div>
      </div>
      <div className={cl.description}>
        {categories.map((category, index) => (
          <p
            className={index === active ? cl.appear : cl.hide}
            key={category._id}
          >
            {category.body}
          </p>
        ))}
      </div>
    </>
  );
};

export default ImgSlider;
