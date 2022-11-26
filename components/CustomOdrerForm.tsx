import React from 'react'
import cl from "../styles/components/CustomOdrerForm.module.sass";
import Button from './UI/Button';
import Textarea from './UI/Textarea';
import TextInput from './UI/TextInput';

const CustomOdrerForm = () => {
  return (
    <form className={cl.form}>
      <h2>О, моё почтение! Давай зактулхуячем тебе брутальный кастом.</h2>
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
  );
}

export default CustomOdrerForm