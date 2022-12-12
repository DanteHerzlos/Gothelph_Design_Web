import React from "react";
import AddIcon from "../Icons/AddIcon";
import cl from "@styles/components/UI/AddButton.module.sass";

interface AddButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={cl.btn}>
      <AddIcon />
    </div>
  );
};

export default AddButton;
