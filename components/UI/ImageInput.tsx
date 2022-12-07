import Image from "next/image";
import React, { useEffect, useState } from "react";
import cl from "../../styles/components/UI/ImageInput.module.sass";
import AddIcon from "../Icons/AddIcon";

interface ImageInputProps {
  required?: boolean;
  name?: string;
  defaultValue?: string;
  id?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  required,
  defaultValue = "",
  name = "file",
  id,
}) => {
  const [filePreview, setFilePreview] = useState<string>(defaultValue);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilePreview(
      e.currentTarget.files && e.currentTarget.files[0]
        ? URL.createObjectURL(e.currentTarget.files[0])
        : ""
    );
  };

  return (
    <div className={cl.file_container}>
      <label className={cl.file_label} htmlFor={id}>
        <div className={cl.file_input_preview}>
          <input
            required={required}
            name={name}
            onChange={(e) => inputChangeHandler(e)}
            className={cl.file_input}
            id={id}
            type="file"
            accept="image/*"
          />
          {filePreview === "" ? (
            <AddIcon />
          ) : (
            <Image width={100} height={100} src={filePreview} alt="preview" />
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageInput;
