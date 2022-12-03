import React from "react";
import cl from "../styles/components/Card.module.sass";
import Image from "next/image";
import EditPanel from "./EditPanel";

interface CardProps {
  className?: string;
  title?: string;
  onDelete?: React.MouseEventHandler<HTMLDivElement>;
  src: string;
}

const Card: React.FC<CardProps> = ({onDelete, className, title, src }) => {
  return (
    <div className={cl.card + " " + className}>
      <EditPanel onDelete={onDelete} onEdit={(e) => e.preventDefault()} editBtn deleteBtn />
      <Image fill src={src} alt={title || ""} />
      {title && <span>{title}</span>}
    </div>
  );
};

export default Card;
