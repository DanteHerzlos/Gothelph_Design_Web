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
        <form className={cl.form}>
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
          <TextInput name="name" placeholder="Имя..." />
          <TextInput name="city" placeholder="Город..." />
          <TextInput name="tel" placeholder="Телефон..." />
          <TextInput name="email" placeholder="Email..." />
          <Textarea
            name="message"
            placeholder="Дополнительная информация по заказу"
          />
          <Button>Заказать</Button>
        </form>
      </Modal>
    </>
  );
};

export default OdrerForm;
