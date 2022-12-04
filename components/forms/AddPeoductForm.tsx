import React, { useState } from "react";
import Button from "../UI/Button";
import ImageInput from "../UI/ImageInput";
import TextInput from "../UI/TextInput";
import ProductService from "../../services/ProductService";
import { useAppDispatch } from "../../hooks/redux";
import Modal from "../UI/Modal";
import AddButton from "../UI/AddButton";
import cl from "../../styles/components/forms/AddProductForm.module.sass";
import Message from "../UI/Message";
import { addProduct } from "../../store/reducers/product/productSlice";


const AddProductForm: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  };

  return (
    <>
      <AddButton onClick={() => setOpen(true)} />
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <form onSubmit={(e) => onSubmit(e)} className={cl.form}>
          <h2>Добавить продукт</h2>
          <br />
          <TextInput
            required
            name="short_title"
            id="name"
            placeholder="Кароткое название продукта"
          />
          <br />
          <br />
          <h3>Изоброжение обложки:</h3>
          <br />
          <ImageInput required name="file" />
          <br />
          <Message message={errorMessage} onClick={() => setErrorMessage("")} />
          <br />
          <Button type="submit" progress={isLoading}>
            Добавить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddProductForm;
