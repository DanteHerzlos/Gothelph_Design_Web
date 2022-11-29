import React from 'react'
import cl from '../styles/components/Card.module.sass'
import cat1 from "../public/cat-1.jpg";
import Image from 'next/image';

interface CardProps {
  className?: string
  title?: string
}

const Card:React.FC<CardProps> = ({className, title}) => {
  return (
    <div className={cl.card + ' ' + className}>
      <Image src={cat1} alt="" />
      {title && <span>{title}</span>}
    </div>
  )
}

export default Card