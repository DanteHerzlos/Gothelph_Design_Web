import Link from "next/link";
import React, { useState } from "react";
import cl from "../styles/components/Sidebar.module.sass";
import DoubleLeftIcon from "./Icons/DoubleLeftIcon";
import ListIcon from "./Icons/ListIcon";
import { routes } from "../routes";


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
          {routes.map((route, index) => (
            <Link key={index} href={route.href}>
              <div className={cl.menu_btn}>{route.title}</div>
            </Link>
          ))}
          <div onClick={() => setIsOpen(false)} className={cl.double_left_btn}>
            <DoubleLeftIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
