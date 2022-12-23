import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import EditButton from "../UI/EditButton";
import ImageInput from "../UI/ImageInput";
import Modal from "../UI/Modal";
import TextInput from "../UI/TextInput";
import Message from "../UI/Message";
import Textarea from "../UI/Textarea";
import { ICategory } from "types/ICategory";
import { useAppDispatch } from "@hooks/redux";
import { updateCategory } from "@store/reducers/category/categorySlice";
import cl from "@styles/components/forms/EditCategoryForm.module.sass";
import { firebaseStorageService } from "@lib/firebaseStorageService";

interface EditCategoryFormProps {
  category: ICategory;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (form.current) {
      form.current.body.value = category.body;
      form.current.category.value = category.title;
    }
  }, [category]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();
    formData.append("category", form.category.value);
    formData.append("body", form.body.value);
    
    setIsLoading(true);
    try {
      if (form.file.files.length) {
        const fileUrl = await firebaseStorageService.save(form.file.files[0]);
        formData.append("fileUrl", fileUrl);
      }
      const res = await fetch("/api/category/" + category._id, {
        body: formData,
        method: "put",
      });
      const data = await res.json();
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
        <form ref={form} onSubmit={(e) => onSubmit(e)} className={cl.form}>
          <h2>Изменить категорию {category.title}</h2>
          <TextInput
            defaultValue={category.title}
            required
            name="category"
            id="name"
            placeholder="Название категории"
          />
          <Textarea
            defaultValue={category.body}
            id="body"
            name="body"
            placeholder="Описание категории"
          />
          <h3>Изоброжение обложки:</h3>
          <ImageInput
            id={category._id}
            defaultValue={category.url_img}
            name="file"
          />
          <Message message={errorMessage} />
          <Button type="submit" progress={isLoading}>
            Изменить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditCategoryForm;
