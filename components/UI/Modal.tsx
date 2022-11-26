import React from 'react'
import cl from "../../styles/components/UI/Modal.module.sass";

interface ModalProps {
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
  children?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div onClick={onClose} className={cl.modalContainer}>
      <div onClick={(e) => e.stopPropagation()} className={cl.modal}>
        <span onClick={onClose} className={cl.closeBtn}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
