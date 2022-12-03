import React from "react";
import cl from "../../styles/components/UI/Button.module.sass";

interface ButtonProps {
  children?: string;
  white?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  progress?: boolean;
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  white,
  onClick,
  progress,
  type
}) => {
  return (
    <button
      type={type}
      onClick={progress ? undefined : onClick}
      className={[
        progress && cl.progress,
        white && cl.white,
        cl.btn,
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
