import React from "react";
import Image from "next/image";
import Link from "next/link";
import menu1 from "@public/menu-1.jpg";
import menu2 from "@public/menu-2.jpg";
import menu3 from "@public/menu-3.jpg";
import menu4 from "@public/menu-4.jpeg";
import cl from "@styles/components/HomeMenu.module.sass";

interface HomeMenuProps {
  scroll: number;
}

const HomeMenu: React.FC<HomeMenuProps> = ({ scroll }) => {
  return (
    <div className={cl.menu}>
      <Link
        href="/custom"
        style={{ animationDelay: -scroll + "s" }}
        className={cl.menu_btn}
      >
        <Image className={cl.img} src={menu1} alt="" />
        <span style={{ animationDelay: -scroll + "s" }}>КАСТОМ</span>
      </Link>
      <Link
        href="/clothes"
        style={{ animationDelay: -scroll + "s" }}
        className={cl.menu_btn}
      >
        <Image className={cl.img} src={menu2} alt="" />
        <span style={{ animationDelay: -scroll + "s" }}>ШМОТКИ</span>
      </Link>
      <Link
        href="/arts"
        style={{ animationDelay: -scroll + "s" }}
        className={cl.menu_btn}
      >
        <Image className={cl.img} src={menu3} alt="" />
        <span style={{ animationDelay: -scroll + "s" }}>КАРТИНЫ</span>
      </Link>
      <Link
        href="/auto"
        style={{ animationDelay: -scroll + "s" }}
        className={cl.menu_btn}
      >
        <Image className={cl.img} src={menu4} alt="" />
        <span style={{ animationDelay: -scroll + "s" }}>АВТОТЕМА</span>
      </Link>
    </div>
  );
};

export default HomeMenu;
