import React from 'react'
import Button from './UI/Button';
import FileInput from './UI/ImageInput';
import TextInput from './UI/TextInput';
import cl from "../styles/components/AddCategoryForm.module.sass";

const AddCategoryForm = () => {
  return (
    <form className={cl.form}>
      <h2>Добавить категорию</h2>
      <br />
      <TextInput placeholder="Название категории" />
      <br />
      <br />
      <h3>Изоброжение обложки:</h3>
      <br />
      <FileInput id="file" />
      <br />
      <Button>Добавить</Button>
    </form>
  );
}

export default AddCategoryForm