import React, { useState } from "react";
import cl from "@styles/components/forms/AuthForm.module.sass";
import TextInput from "@components/UI/TextInput";
import Button from "@components/UI/Button";
import Message from "@components/UI/Message";
import { useSession, signIn } from "next-auth/react";

const AuthForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { status } = useSession();

  const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      await signIn("credentials", {
        email: form.email.value,
        password: form.password.value,
      });
    } catch (error: any) {
      setErrorMessage(error.mesage);
    }
  };

  return (
    <form onSubmit={(e) => onFinish(e)} className={cl.form}>
      <h1>Авторизация</h1>
      <Message message={errorMessage} onClick={() => setErrorMessage("")} />
      <TextInput
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        required
        placeholder="Email..."
        name="email"
      />
      <TextInput
        type="password"
        required
        placeholder="Пароль..."
        name="password"
      />
      <Button progress={status === "loading"} type="submit">
        Войти
      </Button>
    </form>
  );
};

export default AuthForm;
