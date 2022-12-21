import React, { useEffect, useState } from "react";
import LeftIcon from "./Icons/LeftIcon";
import RightIcon from "./Icons/RightIcon";
import Image from "next/image";
import EditCategoryPanel from "./EditCategoryPanel";
import { CategoryType } from "types/CategoryType";
import { ICategory } from "types/ICategory";
import cl from "@styles/components/ImgSplitSlider.module.sass";

interface ImgSplitSliderProps {
  categories: ICategory[];
  activeCategory?: ICategory | null;
  type: CategoryType;
}

const ImgSplitSlider: React.FC<ImgSplitSliderProps> = ({
  activeCategory,
  categories,
  type,
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

  const directionClass = (index: number, direction: string) => {
    switch (index) {
      case active:
        return [cl._active, direction].join(" ");
      case previous:
        return [cl._prev, direction].join(" ");
      default:
        return "";
    }
  };

  return (
    <div className={cl.container}>
      <div className={cl.slider}>
        {categories.length !== 0 && categories[active] && (
          <EditCategoryPanel
            className={cl.edit_panel}
            type={type}
            category={categories[active]}
            editBtn
            deleteBtn
          />
        )}
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
              sizes="(max-width: 1200px) 100vw, 50vw"
              className={directionClass(index, imgDirection)}
              key={index}
              src={category.url_img}
              alt={category.title}
            />
          ))}
        </div>
        <div className={cl.body}>
          {categories.map((category, index) => (
            <div className={directionClass(index, bodyDirection)} key={index}>
              <h1 className={cl.body__title}>{category.title}</h1>
              <p>{category.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImgSplitSlider;
