import React, { ReactNode } from "react";
import cl from "../../styles/components/UI/Message.module.sass";

interface MessageProps {
  message: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Message: React.FC<MessageProps> = ({ message, onClick }) => {

  if(message) return <div onClick={onClick} className={cl.message}>{message}</div>
  else return <></>
};

export default Message;
