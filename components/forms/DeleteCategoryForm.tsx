import React, { useState } from "react";
import Button from "../UI/Button";
import TextInput from "../UI/TextInput";
import Modal from "../UI/Modal";
import DeleteButton from "../UI/DeleteButton";
import { ICategory } from "types/ICategory";
import Message from "../UI/Message";
import { removeCategory } from "@store/reducers/category/categorySlice";
import { useAppDispatch } from "@hooks/redux";
import cl from "@styles/components/forms/DeleteCategoryForm.module.sass";

interface DeleteCategoryFormProps {
  category: ICategory;
}

const DeleteCategoryForm: React.FC<DeleteCategoryFormProps> = ({
  category,
}) => {
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

    if (category._id && e.currentTarget.confirm.value === category._id) {
      setIsLoading(true);

      try {
        const res = await fetch("/api/category/" + category._id, {
          method: "delete",
        });
        const data = await res.json();
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
          <h3>
            Для удаления введите id категории: <b>{category._id}</b>
          </h3>
          <TextInput
            required
            name="confirm"
            id="name"
            placeholder="Название категории"
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

export default DeleteCategoryForm;
