import React from "react";
import TrashIcon from "../Icons/TrashIcon";
import cl from "@styles/components/UI/AddButton.module.sass";

interface DeleteButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={cl.btn}>
      <TrashIcon />
    </div>
  );
};

export default DeleteButton;
