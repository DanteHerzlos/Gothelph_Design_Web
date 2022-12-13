import LeftIcon from "@components/Icons/LeftIcon";
import RightIcon from "@components/Icons/RightIcon";
import React from "react";
import cl from "@styles/components/UI/ArrowButton.module.sass";

interface ArrowButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  direction: "right" | "left";
  className?: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  onClick,
  direction,
  className,
}) => {
  return (
    <div onClick={onClick} className={[cl.btn, className].join(" ")}>
      {direction === "right" && <RightIcon />}
      {direction === "left" && <LeftIcon />}
    </div>
  );
};

export default ArrowButton;
