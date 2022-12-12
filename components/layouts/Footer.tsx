import Link from "next/link";
import React from "react";
import cl from "@styles/components/layouts/Footer.module.sass";

const Footer = () => {
  return (
    <div className={cl.footer}>
      <Link target="_blank" className={cl.btn} href="https://t.me/Gothelph">
        TELEGRAM
      </Link>
      <Link
        target="_blank"
        className={cl.btn}
        href="https://vk.com/gothelph_design"
      >
        VKONTAKTE
      </Link>
      <Link
        target="_blank"
        className={cl.btn}
        href="https://www.instagram.com/gothelph"
      >
        INSTAGRAM
      </Link>
    </div>
  );
};

export default Footer;
