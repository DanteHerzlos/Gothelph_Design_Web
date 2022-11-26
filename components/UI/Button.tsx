import React from 'react'
import cl from "../../styles/components/UI/Button.module.sass";

interface ButtonProps {
  children?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Button: React.FC<ButtonProps> = ({ children, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={active ? [cl.btn, cl.active].join(" ") : cl.btn}
    >
      <span>{children}</span>
    </div>
  );
};

export default Button