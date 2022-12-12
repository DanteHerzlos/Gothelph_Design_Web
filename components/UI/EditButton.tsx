import React from "react";
import EditIcon from "../Icons/EditIcon";
import cl from "@styles/components/UI/EditButton.module.sass";

interface EditButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <div className={cl.btn} onClick={onClick}>
      <EditIcon />
    </div>
  );
};

export default EditButton;
