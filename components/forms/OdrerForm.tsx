import React, { ReactElement, useState } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Textarea from "../UI/Textarea";
import TextInput from "../UI/TextInput";
import cl from "@styles/components/forms/OdrerForm.module.sass";

interface OdrerFormProps {
  className?: string;
  children?: string | ReactElement;
  product_name?: string;
  product_price?: string;
}

const OdrerForm: React.FC<OdrerFormProps> = ({
  className,
  children,
  product_name,
  product_price,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const order = product_price
      ? product_name + " " + product_price + "p"
      : product_name;
    formData.append("order", order as string);
    try {
      const res = await fetch("/api/sendmail", {
        method: "post",
        body: formData,
      });
      const data = await res.json();
      setOpen(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const content = () => {
    if (typeof children === "string") {
      return (
        <Button className={className} onClick={() => setOpen(true)}>
          {children}
        </Button>
      );
    }
    return (
      <div className={className} onClick={() => setOpen(true)}>
        {children}
      </div>
    );
  };

  return (
    <>
      <div className={cl.modal_btn}>{content()}</div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={(e) => onFinish(e)} className={cl.form}>
          <h2>Оформление заказа</h2>
          <div className={cl.order_details}>
            <div className={cl.order_details__title}>
              <b>Товар</b>
              <b>Сумма</b>
            </div>
            <hr />
            <div className={cl.order_details__product}>
              <p>{product_name}</p>
              {product_price ? <p>{product_price}₽</p> : <p>---</p>}
            </div>
          </div>
          <TextInput required name="name" placeholder="Имя..." />
          <TextInput name="city" placeholder="Город..." />
          <TextInput required name="phone" placeholder="Телефон..." />
          <TextInput
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            name="email"
            placeholder="Email..."
          />
          <Textarea
            name="message"
            placeholder="Дополнительная информация по заказу"
          />
          <Button progress={isLoading}>Заказать</Button>
        </form>
      </Modal>
    </>
  );
};

export default OdrerForm;
