import React from 'react'
import cl from '../styles/components/Card.module.sass'
import Image from 'next/image';

interface CardProps {
  className?: string
  title?: string
  src: string
}

const Card: React.FC<CardProps> = ({ className, title, src }) => {
  return (
    <div className={cl.card + " " + className}>
      <Image fill src={src} alt={title || ""} />
      {title && <span>{title}</span>}
    </div>
  );
};

export default Card