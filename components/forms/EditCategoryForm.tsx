import React, { useState } from "react";
import Button from "../UI/Button";
import EditButton from "../UI/EditButton";
import ImageInput from "../UI/ImageInput";
import Modal from "../UI/Modal";
import TextInput from "../UI/TextInput";
import Message from "../UI/Message";
import Textarea from "../UI/Textarea";
import { ICategory } from "types/ICategory";
import { useAppDispatch } from "@hooks/redux";
import CategoryService from "@services/CategoryService";
import { updateCategory } from "@store/reducers/category/categorySlice";
import cl from "@styles/components/forms/EditCategoryForm.module.sass";

interface EditCategoryFormProps {
  category: ICategory;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData();
    if (form.file.files.length) {
      formData.append("file", form.file.files[0]);
    }
    formData.append("category", form.category.value);

    setIsLoading(true);
    try {
      const data = await CategoryService.updateCategory(
        category._id!,
        formData
      );
      dispatch(updateCategory(data));
      form.reset();
      setOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
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
          <h2>Изменить категорию {category.title}</h2>
          <br />
          <TextInput
            defaultValue={category.title}
            required
            name="category"
            id="name"
            placeholder="Название категории"
          />
          <br />
          <br />
          <Textarea
            defaultValue={category.body}
            id="body"
            name="body"
            placeholder="Описание категории"
          />
          <br />
          <br />
          <h3>Изоброжение обложки:</h3>
          <br />
          <ImageInput
            id={category._id}
            defaultValue={category.url_img}
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

export default EditCategoryForm;
