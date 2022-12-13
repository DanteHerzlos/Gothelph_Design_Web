import React from "react";
import cl from "@styles/components/layouts/Header.module.sass";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  if (!title) return <></>;
  return (
    <div className={cl.header}>
      <h1 className={cl.header__title}>
        <span className={cl.header__title__gothelph}>GOTHELPH</span>{" "}
        {title.toUpperCase()}
      </h1>
    </div>
  );
};

export default Header;
