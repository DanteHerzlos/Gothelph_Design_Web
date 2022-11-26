import Link from 'next/link'
import React from 'react'
import cl from "../styles/components/Footer.module.sass";

const Footer = () => {
  return (
    <div className={cl.footer}>
      <Link className={cl.btn} href="/">
        TELEGRAM
      </Link>
      <Link className={cl.btn} href="/">
        VKONTAKTE
      </Link>
      <Link className={cl.btn} href="/">
        INSTAGRAM
      </Link>
    </div>
  );
}

export default Footer