import AuthForm from "@components/forms/AuthForm";
import React from "react";
import cl from "@styles/Admin.module.sass";
import { useSession, signOut } from "next-auth/react";
import Button from "@components/UI/Button";

const Admin = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={cl.container}>
        <Button onClick={() => signOut()}>Выход</Button>
      </div>
    );
  }
  return (
    <div className={cl.container}>
      <AuthForm />
    </div>
  );
};

export default Admin;
