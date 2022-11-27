import React from 'react'
import cl from '../styles/components/Card.module.sass'
import cat1 from "../public/cat-1.jpg";
import Image from 'next/image';


const Card = () => {
  return (
    <div className={cl.card}>
      <Image src={cat1} alt="" />
      <span>Text</span>
    </div>
  )
}

export default Card