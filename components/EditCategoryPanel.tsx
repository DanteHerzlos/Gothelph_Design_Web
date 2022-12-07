import React from "react";
import { ICategory } from "../types/ICategory";
import AddCategoryForm from "./forms/AddCategoryForm";
import DeleteCategoryForm from "./forms/DeleteCategoryForm";
import EditCategoryForm from "./forms/EditCategoryForm";
import cl from "../styles/components/EditPanel.module.sass";
import { CategoryType } from "../types/CategoryType";

interface EditCategoryPanelProps {
  addBtn?: boolean;
  editBtn?: boolean;
  deleteBtn?: boolean;
  className?: string;
  type: CategoryType
  category?: ICategory;
}

const EditCategoryPanel: React.FC<EditCategoryPanelProps> = ({
  addBtn = false,
  editBtn = false,
  deleteBtn = false,
  className,
  category,
  type
}) => {
  // if(!isAuth) return <></>

  return (
    <div className={cl.panel + " " + className}>
      {addBtn && <AddCategoryForm type={type} />}
      {editBtn && <EditCategoryForm category={category!} />}
      {deleteBtn && <DeleteCategoryForm category={category!} />}
    </div>
  );
};

export default EditCategoryPanel;
