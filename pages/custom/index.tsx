import React, { useState } from "react";
import Carousel from "../../components/Carousel";
import CustomOdrerForm from "../../components/CustomOdrerForm";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import cl from '../../styles/Custom.module.sass'

const Custom = () => {
  const [isActive, setIsActive] = useState<boolean>(true)
  const [isOrderForm, setIsOrderForm] = useState<boolean>(false)


  return (
    <Layout title="Custom Collection">
      <>
        <div className={cl.carousel_container}>
          <div className={cl.carousel_btns}>
            <div className={cl.carousel_btns_btns}>
              <Button>Valhalla</Button>
              <Button>Cannibal</Button>
              <Button>Suicide</Button>
              <Button onClick={() => setIsActive(!isActive)} white={isActive}>
                Behemoth
              </Button>
            </div>
          </div>
          <div className={cl.carousel}>
            <Carousel />
          </div>
        </div>
        <div className={cl.description_container}>
          <div className={cl.order_btn}>
            <Button onClick={() => setIsOrderForm(true)}>
              Заказать Кастом
            </Button>
          </div>
          <div className={cl.description}>
            <h3>Кастомная касуха Cannibal Corpse.</h3>
            <p>
              Смотри, дэто же - чертова косуха c Cannibal Corpse. Джорж, мать
              его, Фишер заценит такой пригид, когда перстанет вызывать Торнадо
              своей шеей и обратит внимание дэтот шедевр отечественного
              кожевельного ремесла.
            </p>
            <p>
              Дэто делалась не очумелыми ручками в дестком кружке по рисованию,
              а таким же трушником, как ты...только талантливее в разы (чсв
              шутка, не принимать близко к бессердечию.)
            </p>
            <p>Сделано с ненавистью к тебе и с любовью к металу.</p>
          </div>
        </div>

        {isOrderForm && (
          <Modal onClose={() => setIsOrderForm(false)}>
            <CustomOdrerForm />
          </Modal>
        )}
      </>
    </Layout>
  );
};

export default Custom;
