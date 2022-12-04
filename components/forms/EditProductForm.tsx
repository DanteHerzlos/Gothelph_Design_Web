import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import Button from "../UI/Button";
import EditButton from "../UI/EditButton";
import ImageInput from "../UI/ImageInput";
import Modal from "../UI/Modal";
import TextInput from "../UI/TextInput";
import cl from "../../styles/components/forms/EditProductForm.module.sass";
import Message from "../UI/Message";
import { IProduct } from "../../types/IProduct";


interface EditProductFormProps {
  product: IProduct
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onOpenModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(true);
  };

  const onCloseModal = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <>
      <EditButton onClick={(e) => onOpenModal(e)} />
      <Modal open={open} onClose={(e) => onCloseModal(e)}>
        <form onSubmit={(e) => onSubmit(e)} className={cl.form}>
          <h2>Изменить продукт {product.title}</h2>
          <br />
          <TextInput
            defaultValue={product.title}
            required
            name="short_title"
            id="name"
            placeholder="Название продукта"
          />
          <br />
          <br />
          <h3>Изоброжение обложки:</h3>
          <br />
          <ImageInput
            id={product._id}
            defaultValue={product.imgs[0].url}
            name="file"
          />
          <br />
          <Message message={errorMessage} />
          <br />
          <Button type="submit" progress={isLoading}>
            Изменить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditProductForm;
