import React from "react";
import cl from "@styles/components/UI/Modal.module.sass";

interface ModalProps {
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
  children?: React.ReactElement;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, open }) => {
  return (
    <div
      onMouseDown={onClose}
      className={open ? cl.container_modal : cl.display_none}
    >
      <div onMouseDown={(e) => e.stopPropagation()} className={cl.modal}>
        <span onClick={onClose} className={cl.close_btn}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
