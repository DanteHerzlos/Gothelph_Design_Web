import React from "react";
import cl from "../styles/components/Card.module.sass";
import Image from "next/image";
import { ICategory } from "../types/ICategory";

interface CardProps {
  className?: string;
  category: ICategory
}

const Card: React.FC<CardProps> = ({ className, category }) => {
  return (
    <div className={cl.card + " " + className}>
      <Image fill src={category.url_img} alt={category.title || ""} />
      {category.title && <span>{category.title}</span>}
    </div>
  );
};

export default Card;
