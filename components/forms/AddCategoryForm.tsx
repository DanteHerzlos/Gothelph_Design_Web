import React, { useRef, useState } from "react";
import Button from "../UI/Button";
import ImageInput from "../UI/ImageInput";
import TextInput from "../UI/TextInput";
import { CategoryType } from "../../types/CategoryType";
import CategoryService from "../../services/CategoryService";
import { useAppDispatch } from "../../hooks/redux";
import { addCategory } from "../../store/reducers/category/categorySlice";
import Modal from "../UI/Modal";
import AddButton from "../UI/AddButton";
import cl from "../../styles/components/forms/AddCategoryForm.module.sass";
import Message from "../UI/Message";

interface AddCategoryFormProps {
  type: CategoryType;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ type }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("type", type);
    setIsLoading(true);

    try {
      const data = await CategoryService.postCategory(formData);
      dispatch(addCategory(data));
      form.reset();
      setOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <AddButton onClick={() => setOpen(true)} />
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <form onSubmit={(e) => onSubmit(e)} className={cl.form}>
          <h2>Добавить категорию</h2>
          <br />
          <TextInput
            required
            name="category"
            id="name"
            placeholder="Название категории"
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

export default AddCategoryForm;
