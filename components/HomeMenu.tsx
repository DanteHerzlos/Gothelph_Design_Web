import React from "react";
import Image from "next/image";
import Link from "next/link";
import menu_custom from "@public/menu-custom.jpg";
import menu_clothes from "@public/menu-clothes.jpg";
import menu_arts from "@public/menu-arts.jpg";
import menu_auto from "@public/menu-auto.jpg";
import cl from "@styles/components/HomeMenu.module.sass";

interface HomeMenuProps {
  scroll: number;
}

const HomeMenu: React.FC<HomeMenuProps> = ({ scroll }) => {
  return (
    <div className={cl.menu}>
      <Link
        data-testid="custom"
        href="/custom"
        style={{ animationDelay: -scroll + "s" }}
        className={cl.menu_btn}
      >
        <Image
          width={800}
          height={600}
          priority
          className={cl.img}
          src={menu_custom}
          alt="Custom"
        />
        <span style={{ animationDelay: -scroll + "s" }}>КАСТОМ</span>
      </Link>
      <Link
        data-testid="clothes"
        href="/clothes"
        style={{ animationDelay: -scroll + "s" }}
        className={cl.menu_btn}
      >
        <Image
          width={800}
          height={600}
          priority
          className={cl.img}
          src={menu_clothes}
          alt="Clothes"
        />
        <span style={{ animationDelay: -scroll + "s" }}>ШМОТКИ</span>
      </Link>
      <Link
        data-testid="arts"
        href="/arts"
        style={{ animationDelay: -scroll + "s" }}
        className={cl.menu_btn}
      >
        <Image
          width={800}
          height={600}
          priority
          className={cl.img}
          src={menu_arts}
          alt="Arts"
        />
        <span style={{ animationDelay: -scroll + "s" }}>КАРТИНЫ</span>
      </Link>
      <Link
        data-testid="auto"
        href="/auto"
        style={{ animationDelay: -scroll + "s" }}
        className={cl.menu_btn}
      >
        <Image
          width={800}
          height={600}
          priority
          className={cl.img}
          src={menu_auto}
          alt="Auto"
        />
        <span style={{ animationDelay: -scroll + "s" }}>АВТОТЕМА</span>
      </Link>
    </div>
  );
};

export default HomeMenu;
