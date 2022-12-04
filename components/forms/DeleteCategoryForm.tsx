import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import Button from "../UI/Button";
import TextInput from "../UI/TextInput";
import cl from "../../styles/components/forms/DeleteCategoryForm.module.sass";
import { removeCategory } from "../../store/reducers/category/categorySlice";
import Modal from "../UI/Modal";
import DeleteButton from "../UI/DeleteButton";
import { ICategory } from "../../types/ICategory";
import Message from "../UI/Message";
import CategoryService from "../../services/CategoryService";

interface DeleteFormProps {
  category: ICategory;
}

const DeleteForm: React.FC<DeleteFormProps> = ({ category }) => {
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
    e.currentTarget.confirm.value = e.currentTarget.confirm.value.trim();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    if (category._id && e.currentTarget.confirm.value === category._id) {
      setIsLoading(true);

      try {
        const data = await CategoryService.removeCategory(category._id);       
        if (data) dispatch(removeCategory(category._id));
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
          <h2>Удалить категорию {category.title}?</h2>
          <br />
          <h3>
            Для удаления введите id категории: <b>{category._id}</b>
          </h3>
          <br />
          <TextInput
            required
            name="confirm"
            id="name"
            placeholder="Название категории"
          />
          <br />
          <br />
          <Message onClick={() => setErrorMessage("")} message={errorMessage} />
          <br />
          <Button type="submit" progress={isLoading}>
            Удалить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default DeleteForm;