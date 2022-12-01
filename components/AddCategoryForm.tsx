import React, { useRef } from "react";
import Button from "./UI/Button";
import FileInput from "./UI/ImageInput";
import TextInput from "./UI/TextInput";
import cl from "../styles/components/AddCategoryForm.module.sass";
import { CategoryType } from "../types/CategoryType";
import axios from "axios";



interface AddCategoryFormProps {
  type: CategoryType;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ type }) => {
  const formRef = useRef<HTMLFormElement | null>(null);


  const onSubmit = async() => {
    const formData = new FormData(formRef.current!);
    formData.append("type", type);
    try {
      const { data } = await axios.post("/api/category", formData);  
      console.log(data);
      
      return data
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <form ref={formRef} className={cl.form}>
      <h2>Добавить категорию</h2>
      <br />
      <TextInput name="category" id="name" placeholder="Название категории" />
      <br />
      <br />
      <h3>Изоброжение обложки:</h3>
      <br />
      <FileInput name="file" />
      <br />
      <Button onClick={onSubmit}>Добавить</Button>
    </form>
  );
};

export default AddCategoryForm;
