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
          <div className={cl.menuBtn}>Главная</div>
          <div className={cl.menuBtn}>Menu 1</div>
          <div className={cl.menuBtn}>Menu 2</div>
          <div className={cl.menuBtn}>Menu 3</div>
          <div onClick={() => setIsOpen(false)} className={cl.DoubleLeftBtn}>
            <DoubleLeftIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
