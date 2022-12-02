import React from "react";
import cl from "../../styles/components/UI/Button.module.sass";

interface ButtonProps {
  children?: string;
  white?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  progress?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  white,
  onClick,
  progress,
}) => {
  return (
    <div
      onClick={progress ? undefined : onClick}
      className={[
        progress && cl.progress,
        white && cl.white,
        cl.btn,
        className,
      ].join(" ")}
    >
      <span>{children}</span>
    </div>
  );
};

export default Button;
