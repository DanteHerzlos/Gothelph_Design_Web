import React from 'react'
import cl from "../styles/components/EditPanel.module.sass";
import AddButton from './UI/AddButton';
import EditButton from './UI/EditButton';

interface EditPanelProps {
  edit?: boolean;
  add?: boolean;
  onEdit?: React.MouseEventHandler<HTMLDivElement>;
  onAdd?: React.MouseEventHandler<HTMLDivElement>;
}

const EditPanel: React.FC<EditPanelProps> = ({add=false, edit=false, onEdit, onAdd}) => {
  return (
    <div className={cl.panel}>
      {edit && <EditButton onClick={onEdit}/>}
      {add && <AddButton onClick={onAdd}/>}
    </div>
  );
};

export default EditPanel