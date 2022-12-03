import React from "react";
import cl from "../styles/components/EditPanel.module.sass";
import AddButton from "./UI/AddButton";
import DeleteButton from "./UI/DeleteButton";
import EditButton from "./UI/EditButton";

interface EditPanelProps {
  addBtn?: boolean;
  editBtn?: boolean;
  deleteBtn?: boolean;
  onEdit?: React.MouseEventHandler<HTMLDivElement>;
  onAdd?: React.MouseEventHandler<HTMLDivElement>;
  onDelete?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const EditPanel: React.FC<EditPanelProps> = ({
  addBtn = false,
  editBtn = false,
  deleteBtn = false,
  onAdd,
  onEdit,
  onDelete,
  className,
}) => {
  return (
    <div className={cl.panel + " " + className}>
      {addBtn && <AddButton onClick={onAdd} />}
      {editBtn && <EditButton onClick={onEdit} />}
      {deleteBtn && <DeleteButton onClick={onDelete} />}
    </div>
  );
};

export default EditPanel;
