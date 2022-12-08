import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import Button from "../UI/Button";
import EditButton from "../UI/EditButton";
import Modal from "../UI/Modal";
import TextInput from "../UI/TextInput";
import cl from "../../styles/components/forms/EditProductForm.module.sass";
import Message from "../UI/Message";
import { IProduct } from "../../types/IProduct";
import MultiImageInput from "../UI/MultiImageInput";
import Textarea from "../UI/Textarea";
import { FilePreview } from "../../types/FilePreview";
import ImgService from "../../services/ImgService";
import ProductService from "../../services/ProductService";
import { updateProduct } from "../../store/reducers/product/productSlice";

interface EditProductFormProps {
  product: IProduct;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FilePreview[]>(
    product.imgs.map((img) => {
      return { url: img.url, position: img.position, file: null };
    })
  );

  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const productImgs = [];

    setIsLoading(true);
    try {
      if (files[0].file !== null) {
        await ImgService.removeImgByProductId(product._id!);
        for (const file of files) {
          const imgFormData = new FormData();
          imgFormData.append("file", file.file!);
          imgFormData.append("position", file.position.toString());
          imgFormData.append("type", "product");
          const img = await ImgService.postImg(imgFormData);
          productImgs.push(img);
        }
      } else {
        productImgs.push(...files);
      }

      const ProductformData = new FormData(form);
      ProductformData.append("imgs", JSON.stringify(productImgs));
      const updatedProduct = await ProductService.updateProduct(
        product._id!,
        ProductformData
      );
      dispatch(updateProduct(updatedProduct));
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
          <h2>Изменить продукт</h2>
          <br />
          <TextInput
            required
            defaultValue={product.title}
            name="short_title"
            id="short_title"
            placeholder="Кароткое название продукта"
          />
          <br />
          <br />
          <TextInput
            defaultValue={product.long_title}
            name="long_title"
            id="long_title"
            placeholder="Длинное название продукта"
          />
          <br />
          <br />
          <Textarea
            defaultValue={product.body}
            id="body"
            name="body"
            placeholder="Описание товара"
          />
          <br />
          <br />
          <TextInput
            defaultValue={product.sizes?.join(", ")}
            name="sizes"
            id="sizes"
            placeholder="Размеры"
          />
          <br />
          <br />
          <TextInput
            defaultValue={product.price}
            pattern={"[0-9]+"}
            name="price"
            id="price"
            placeholder="Цена"
          />
          <br />
          <br />
          <h3>Фото продукта:</h3>
          <br />
          <MultiImageInput
            filesPreview={files}
            setFilesPreview={setFiles}
            name="file"
          />
          <br />
          <Message message={errorMessage} onClick={() => setErrorMessage("")} />
          <br />
          <Button type="submit" progress={isLoading}>
            Изменить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditProductForm;
