import React from "react";
import cl from "@styles/components/layouts/Header.module.sass";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  if (!title) return <></>;
  return (
    <div className={cl.header}>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
