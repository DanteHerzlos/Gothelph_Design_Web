import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import EditButton from "../UI/EditButton";
import Modal from "../UI/Modal";
import TextInput from "../UI/TextInput";
import Message from "../UI/Message";
import MultiImageInput from "../UI/MultiImageInput";
import Textarea from "../UI/Textarea";
import { FilePreview } from "types/FilePreview";
import { IProduct } from "types/IProduct";
import { useAppDispatch } from "@hooks/redux";
import { updateProduct } from "@store/reducers/product/productSlice";
import cl from "@styles/components/forms/EditProductForm.module.sass";
import { firebaseStorageService } from "@lib/firebaseStorageService";

interface EditProductFormProps {
  product: IProduct;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FilePreview[]>(
    product.imgs.map((img) => {
      return { url: img.url, position: img.position, file: null };
    })
  );
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (files.length === 0) {
      setErrorMessage("Добавте фотографии повторно!");
      return;
    }
    if (form.current) {
      form.current.short_title.value = product.title;
      form.current.long_title.value = product.long_title;
      form.current.body.value = product.body;
      form.current.sizes.value = product.sizes;
      form.current.price.value = product.price;
      setFiles(
        product.imgs.map((img) => {
          return { url: img.url, position: img.position, file: null };
        })
      );
    }
  }, [product, files.length]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const productImgs = [];

    setIsLoading(true);
    try {
      if (files[0].file !== null) {
        await fetch("api/img?product=" + product._id, {
          method: "delete",
        });
        for (const file of files) {
          const fileUrl = await firebaseStorageService.save(file.file!);
          productImgs.push({
            position: file.position.toString(),
            url: fileUrl,
          });
        }
      } else {
        productImgs.push(...files);
      }

      const ProductformData = new FormData(form);
      ProductformData.append("imgs", JSON.stringify(productImgs));

      const res = await fetch("/api/product/" + product._id, {
        method: "put",
        body: ProductformData,
      });
      const updatedProduct = await res.json();

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
        <form ref={form} onSubmit={(e) => onSubmit(e)} className={cl.form}>
          <h2>Изменить продукт {product.title}</h2>
          <TextInput
            required
            defaultValue={product.title}
            name="short_title"
            // id="short_title"
            placeholder="Кароткое название продукта"
          />
          <TextInput
            defaultValue={product.long_title}
            name="long_title"
            // id="long_title"
            placeholder="Длинное название продукта"
          />
          <Textarea
            defaultValue={product.body}
            // id="body"
            name="body"
            placeholder="Описание товара"
          />
          <TextInput
            defaultValue={product.sizes?.join(", ")}
            name="sizes"
            // id="sizes"
            placeholder="Размеры"
          />
          <TextInput
            defaultValue={product.price}
            pattern={"[0-9]+"}
            name="price"
            // id="price"
            placeholder="Цена"
          />
          <h3>Фото продукта:</h3>
          <MultiImageInput
            filesPreview={files}
            setFilesPreview={setFiles}
            name="file"
          />
          <Message message={errorMessage} onClick={() => setErrorMessage("")} />
          <Button type="submit" progress={isLoading}>
            Изменить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditProductForm;
