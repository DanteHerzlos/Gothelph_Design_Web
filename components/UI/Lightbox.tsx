import React from 'react'
import cl from "../../styles/components/UI/Lightbox.module.sass";

interface LightboxProps {
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
  children?: React.ReactElement;
}
const Lightbox:React.FC<LightboxProps> = ({ onClose, children }) => {
  return (
    <div onClick={onClose} className={cl.container}>
      <span onClick={onClose} className={cl.close_btn}>
        &times;
      </span>
      <div onClick={(e) => e.stopPropagation()} className={cl.lightbox}>
        {children}
      </div>
    </div>
  );
};

export default Lightbox