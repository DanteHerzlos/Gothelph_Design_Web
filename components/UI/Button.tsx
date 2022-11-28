import React from "react";
import cl from "../../styles/components/UI/Button.module.sass";

interface ButtonProps {
  children?: string;
  white?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  white,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={
        white
          ? [cl.btn, cl.white, className].join(" ")
          : [cl.btn, className].join(" ")
      }
    >
      <span>{children}</span>
    </div>
  );
};

export default Button;
