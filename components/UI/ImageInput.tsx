import Image from "next/image";
import React, { useEffect, useState } from "react";
import cl from "../../styles/components/UI/ImageInput.module.sass";
import AddIcon from "../Icons/AddIcon";

interface ImageInputProps {
  name?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ name = "file" }) => {
  const [filePreview, setFilePreview] = useState<string>("");

  return (
    <label className={cl.file_label} htmlFor='file'>
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
        name={name}
        onChange={(e) =>
          setFilePreview(URL.createObjectURL(e.currentTarget.files![0]))
        }
        className={cl.file_input}
        id='file'
        type="file"
        accept="image/*"
      />
    </label>
  );
};

export default ImageInput;
