import React from "react";
import cl from "../../styles/components/UI/Textarea.module.sass";

interface TextareaProps {
  placeholder?: string;
  name?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
}

const Textarea: React.FC<TextareaProps> = ({
  defaultValue,
  placeholder,
  name,
  value,
  onChange,
  id,
}) => {
  const blurHandler = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    e.currentTarget.value = e.currentTarget.value.trim();
  };

  return (
    <textarea
      onBlur={(e) => blurHandler(e)}
      className={cl.input}
      defaultValue={defaultValue}
      rows={7}
      cols={23}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      id={id}
    />
  );
};

export default Textarea;
