import React, { useRef, useState } from "react";
import Button from "./UI/Button";
import ImageInput from "./UI/ImageInput";
import TextInput from "./UI/TextInput";
import cl from "../styles/components/AddCategoryForm.module.sass";
import { CategoryType } from "../types/CategoryType";
import CategoryService from "../services/CategoryService";
import { useAppDispatch } from "../hooks/redux";
import { addCategory } from "../store/reducers/category/categorySlice";

interface AddCategoryFormProps {
  type: CategoryType;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ type }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    formRef.current!.category.value = formRef.current!.category.value.trim();
    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData(formRef.current!);
      formData.append("type", type);
      const { data } = await CategoryService.postCategory(formData);
      dispatch(addCategory(data));
      formRef.current!.reset();
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} className={cl.form}>
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
      <ImageInput name="file" />
      <br />
      <Button progress={isLoading} onClick={onSubmit}>
        Добавить
      </Button>
    </form>
  );
};

export default AddCategoryForm;
