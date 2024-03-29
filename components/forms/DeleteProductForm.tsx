import React, { useState } from "react";
import Button from "../UI/Button";
import TextInput from "../UI/TextInput";
import Modal from "../UI/Modal";
import DeleteButton from "../UI/DeleteButton";
import Message from "../UI/Message";
import { IProduct } from "types/IProduct";
import { useAppDispatch } from "@hooks/redux";
import { removeProduct } from "@store/reducers/product/productSlice";
import cl from "@styles/components/forms/DeleteProductForm.module.sass";

interface DeleteProductFormProps {
  product: IProduct;
}

const DeleteProductForm: React.FC<DeleteProductFormProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();

  const onCloseModal = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(false);
  };

  const onOpenModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(true);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product._id && e.currentTarget.confirm.value === product._id) {
      setIsLoading(true);

      try {
        const res = await fetch("/api/product/" + product._id, {
          method: "delete",
        });
        const data = await res.json();
        if (data) dispatch(removeProduct(product._id));
        setOpen(false);
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage("ID не совпадает!");
    }
  };

  return (
    <>
      <DeleteButton onClick={(e) => onOpenModal(e)} />
      <Modal open={open} onClose={(e) => onCloseModal(e)}>
        <form onSubmit={(e) => onSubmit(e)} className={cl.form}>
          <h2>Удалить продукт {product.title}?</h2>
          <h3>
            Для удаления введите id продукта: <b>{product._id}</b>
          </h3>
          <TextInput
            required
            name="confirm"
            id="name"
            placeholder="ID продукта"
          />
          <Message onClick={() => setErrorMessage("")} message={errorMessage} />
          <Button type="submit" progress={isLoading}>
            Удалить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default DeleteProductForm;
