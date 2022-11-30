import React, { ReactNode } from 'react'
import cl from '../../styles/components/UI/AddButton.module.sass'
import AddIcon from '../Icons/AddIcon';

interface AddButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={cl.btn}>
      <AddIcon/>
    </div>
  );
};

export default AddButton