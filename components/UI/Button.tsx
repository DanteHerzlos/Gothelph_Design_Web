import React from "react";
import cl from "@styles/components/UI/Button.module.sass";

interface ButtonProps {
  children?: string;
  white?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  progress?: boolean;
  type?: "button" | "submit" | "reset";
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  white,
  onClick,
  progress,
  type,
  onMouseOver,
}) => {
  return (
    <button
      onMouseOver={onMouseOver}
      type={type}
      disabled={progress}
      onClick={onClick}
      className={[
        className,
        progress ? cl.progress : "",
        white ? cl.white : "",
        cl.btn,
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
