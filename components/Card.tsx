import React from "react";
import Image from "next/image";
import cl from "@styles/components/Card.module.sass";
interface CardProps {
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  src: string;
}

const Card: React.FC<CardProps> = ({ className, title, onClick, src }) => {
  return (
    <div onClick={onClick} className={cl.card + " " + className}>
      <Image fill src={src} alt={title || ""} />
      {title && <span>{title}</span>}
    </div>
  );
};

export default Card;
