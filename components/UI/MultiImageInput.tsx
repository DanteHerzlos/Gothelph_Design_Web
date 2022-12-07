import Image from "next/image";
import React, { useState } from "react";
import cl from "../../styles/components/UI/MultiImageInput.module.sass";
import { FilePreview } from "../../types/FilePreview";

interface MultiImageInputProps {
  required?: boolean;
  name?: string;
  defaultValue?: string;
  id?: string;
  filesPreview: FilePreview[];
  setFilesPreview: (files: FilePreview[]) => void;
}

const MultiImageInput: React.FC<MultiImageInputProps> = ({
  required,
  defaultValue = "",
  name,
  id,
  filesPreview,
  setFilesPreview
}) => {
  const [dragTo, setDragTo] = useState<number>(0);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files?.length === 0 || !files) {
      setFilesPreview([]);
    } else {
      const preview = [];
      for (let i = 0; i < files.length; i++) {
        preview.push({
          position: i + 1,
          url: URL.createObjectURL(files[i]),
          file: files[i],
        });
      }
      setFilesPreview(preview);
    }
  };

  const dragStartHandler = (img: FilePreview) => {
    setDragTo(img.position);
  };

  const dragEndHandler = (img: FilePreview) => {
    if (dragTo !== img.position) {
      const newOrder = filesPreview.map((preview) => {
        if (preview.position === dragTo) {
          return { ...preview, position: img.position };
        }
        if (preview.position === img.position) {
          return {...preview, position: dragTo};
        }
        return preview;
      }).sort((a,b) => a.position-b.position);

      setFilesPreview(newOrder);
    }
  };
  const dragEnterHandler = (img: FilePreview) => {
    setDragTo(img.position);
  };

  return (
    <>
      <input
        multiple
        required={required}
        name={name}
        onChange={(e) => inputChangeHandler(e)}
        className={cl.input}
        id={id}
        type="file"
        accept="image/*"
      />
      <div className={cl.preview}>
        {filesPreview.map((img) => (
          <div
            draggable
            onDragStart={() => dragStartHandler(img)}
            onDragEnd={() => dragEndHandler(img)}
            onDragEnter={() => dragEnterHandler(img)}
            key={img.url}
            className={cl.preview__box}
          >
            <div className={cl.preview__number}>{img.position}</div>
            <Image
              width={90}
              height={90}
              className={cl.preview__img}
              src={img.url}
              alt="preview"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MultiImageInput;
