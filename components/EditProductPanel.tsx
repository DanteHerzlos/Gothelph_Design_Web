import React from "react";
import cl from "../styles/components/EditPanel.module.sass";
import { IProduct } from "../types/IProduct";
import AddProductForm from "./forms/AddPeoductForm";
import DeleteProductForm from "./forms/DeleteProductForm";
import EditProductForm from "./forms/EditProductForm";

interface EditProductPanelProps {
  addBtn?: boolean;
  editBtn?: boolean;
  deleteBtn?: boolean;
  className?: string;
  product?: IProduct;
  category?: string
}

const EditProductPanel: React.FC<EditProductPanelProps> = ({
  addBtn = false,
  editBtn = false,
  deleteBtn = false,
  className,
  product,
  category
}) => {
  // if(!isAuth) return <></>

  return (
    <div className={cl.panel + " " + className}>
      {addBtn && <AddProductForm category={category!} />}
      {editBtn && <EditProductForm product={product!} />}
      {deleteBtn && <DeleteProductForm product={product!} />}
    </div>
  );
};

export default EditProductPanel;
