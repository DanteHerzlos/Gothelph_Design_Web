import React from 'react'
import cl from "../../styles/components/UI/TextInput.module.sass";

interface TextInputProps {
  placeholder?: string;
  name?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
} 

const TextInput:React.FC<TextInputProps> = ({placeholder, name, id, defaultValue,onChange,value}) => {
  return (
    <input
      className={cl.input}
      placeholder={placeholder}
      name={name}
      id={id}
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
    />
  );
}

export default TextInput;