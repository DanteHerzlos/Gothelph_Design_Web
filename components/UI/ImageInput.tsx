import Image from "next/image";
import React, { useEffect, useState } from "react";
import cl from "../../styles/components/UI/ImageInput.module.sass";
import AddIcon from "../Icons/AddIcon";

interface ImageInputProps {
  id?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ id = "file" }) => {
  const [filePreview, setFilePreview] = useState<string>("");

  return (
    <label className={cl.file_label} htmlFor={id}>
      <div className={cl.file_container}>
        {filePreview === "" ? (
          <AddIcon />
        ) : (
          <Image
            width={100}
            height={100}
            src={filePreview}
            alt="preview"
          />
        )}
      </div>
      <input
        onChange={(e) =>
          setFilePreview(URL.createObjectURL(e.currentTarget.files![0]))
        }
        className={cl.file_input}
        id={id}
        type="file"
        accept="image/*"
      />
    </label>
  );
};

export default ImageInput;
