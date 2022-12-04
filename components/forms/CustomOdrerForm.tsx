import React, { useState } from "react";
import cl from "../../styles/components/forms/CustomOdrerForm.module.sass";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Textarea from "../UI/Textarea";
import TextInput from "../UI/TextInput";

const CustomOdrerForm: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={cl.modal_btn}>
        <Button onClick={() => setOpen(true)}>Заказать кастом</Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className={cl.form}>
          <h2>О, моё почтение! Давай зактулхуячем тебе брутальный кастом.</h2>
          <br />
          <TextInput placeholder="Имя..." />
          <br />
          <br />
          <TextInput placeholder="Email..." />
          <br />
          <br />
          <Textarea placeholder="Ваше сообщение..." />
          <br />
          <br />
          <Button>Заказать</Button>
        </form>
      </Modal>
    </>
  );
};

export default CustomOdrerForm;
