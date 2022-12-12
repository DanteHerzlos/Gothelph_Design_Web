import React, { useState } from "react";
import Button from "../UI/Button";
import TextInput from "../UI/TextInput";
import Modal from "../UI/Modal";
import AddButton from "../UI/AddButton";
import Message from "../UI/Message";
import Textarea from "../UI/Textarea";
import MultiImageInput from "../UI/MultiImageInput";
import ImgService from "@services/ImgService";
import { useAppDispatch } from "@hooks/redux";
import ProductService from "@services/ProductService";
import { addProduct } from "@store/reducers/product/productSlice";
import { FilePreview } from "types/FilePreview";
import cl from "@styles/components/forms/AddProductForm.module.sass";

interface AddProductFormProps {
  category: string;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ category }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [files, setFiles] = useState<FilePreview[]>([]);
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const productImgs = [];

    setIsLoading(true);
    try {
      for (const file of files) {
        const imgFormData = new FormData();
        if (file.file !== null) imgFormData.append("file", file.file);
        imgFormData.append("position", file.position.toString());
        imgFormData.append("type", "product");
        const img = await ImgService.postImg(imgFormData);
        productImgs.push(img);
      }

      const ProductformData = new FormData(form);
      ProductformData.append("imgs", JSON.stringify(productImgs));
      ProductformData.append("category", category);
      const product = await ProductService.postProduct(ProductformData);
      dispatch(addProduct(product));
      setFiles([]);
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
          <h2>Добавить продукт</h2>
          <TextInput
            required
            name="short_title"
            id="short_title"
            placeholder="Кароткое название продукта"
          />
          <TextInput
            name="long_title"
            id="long_title"
            placeholder="Длинное название продукта"
          />
          <Textarea id="body" name="body" placeholder="Описание товара" />
          <TextInput name="sizes" id="sizes" placeholder="Размеры" />
          <TextInput
            pattern={"[0-9]+"}
            name="price"
            id="price"
            placeholder="Цена"
          />
          <h3>Фото продукта:</h3>
          <MultiImageInput
            setFilesPreview={setFiles}
            filesPreview={files}
            required
          />
          <Message message={errorMessage} onClick={() => setErrorMessage("")} />
          <Button type="submit" progress={isLoading}>
            Добавить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddProductForm;
