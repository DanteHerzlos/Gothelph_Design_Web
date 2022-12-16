import React from "react";
import { ICategory } from "types/ICategory";
import { CategoryType } from "types/CategoryType";
import AddCategoryForm from "./forms/AddCategoryForm";
import DeleteCategoryForm from "./forms/DeleteCategoryForm";
import EditCategoryForm from "./forms/EditCategoryForm";
import { useSession } from "next-auth/react";
import cl from "@styles/components/EditPanel.module.sass";


interface EditCategoryPanelProps {
  addBtn?: boolean;
  editBtn?: boolean;
  deleteBtn?: boolean;
  className?: string;
  type: CategoryType;
  category?: ICategory;
}

const EditCategoryPanel: React.FC<EditCategoryPanelProps> = ({
  addBtn = false,
  editBtn = false,
  deleteBtn = false,
  className,
  category,
  type,
}) => {
  const { data: session } = useSession();

  if (!session) return <></>;

  return (
    <div className={cl.panel + " " + className}>
      {addBtn && <AddCategoryForm type={type} />}
      {editBtn && <EditCategoryForm category={category!} />}
      {deleteBtn && <DeleteCategoryForm category={category!} />}
    </div>
  );
};

export default EditCategoryPanel;
