import React from "react";
import cl from "@styles/components/UI/Lightbox.module.sass";

interface LightboxProps {
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
  children?: React.ReactElement;
  open?: boolean;
  className?: string;
}
const Lightbox: React.FC<LightboxProps> = ({
  onClose,
  children,
  open,
  className,
}) => {
  return (
    <div onClick={onClose} className={open ? cl.container : cl.display_none}>
      <span onClick={onClose} className={cl.close_btn}>
        &times;
      </span>
      <div
        onClick={(e) => e.stopPropagation()}
        className={[cl.lightbox, className].join(" ")}
      >
        {children}
      </div>
    </div>
  );
};

export default Lightbox;
