import React, { useState } from "react";
import cl from "@styles/components/UI/TextInput.module.sass";

interface TextInputProps {
  placeholder?: string;
  name?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  required?: boolean;
  pattern?: string;
  type?: React.HTMLInputTypeAttribute;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  name,
  id,
  defaultValue,
  onChange,
  value,
  required,
  pattern,
  type,
}) => {
  const [invalid, setInvalid] = useState<boolean>(false);

  const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.currentTarget.value = e.currentTarget.value.trim();
    setInvalid(!e.currentTarget.checkValidity());
  };

  return (
    <input
      autoComplete="on"
      type={type}
      onInvalid={() => setInvalid(true)}
      onBlur={(e) => blurHandler(e)}
      pattern={pattern}
      required={required}
      className={invalid ? cl.input + " " + cl.invalid : cl.input}
      placeholder={placeholder}
      name={name}
      id={id}
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextInput;
