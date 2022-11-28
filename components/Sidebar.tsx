import Link from "next/link";
import React, { useState } from "react";
import cl from "../styles/components/Sidebar.module.sass";
import DoubleLeftIcon from "./Icons/DoubleLeftIcon";
import ListIcon from "./Icons/ListIcon";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={isOpen ? [cl.btn, cl.open].join(" ") : cl.btn}
      >
        <ListIcon />
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={isOpen ? [cl.container, cl.open].join(" ") : cl.container}
      >
        <div onClick={(e) => e.stopPropagation()} className={cl.sidebar}>
          <Link href="/">
            <div className={cl.menu_btn}>Главная</div>
          </Link>
          <div className={cl.menu_btn}>Menu 1</div>
          <div className={cl.menu_btn}>Menu 2</div>
          <div className={cl.menu_btn}>Menu 3</div>
          <div onClick={() => setIsOpen(false)} className={cl.double_left_btn}>
            <DoubleLeftIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
