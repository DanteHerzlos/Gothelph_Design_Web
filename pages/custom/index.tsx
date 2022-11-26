import React, { useState } from "react";
import Carousel from "../../components/Carousel";
import CustomOdrerForm from "../../components/CustomOdrerForm";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import cl from '../../styles/Custom.module.sass'

const Custom = () => {
  const [isActive, setIsActive] = useState<boolean>(true)
  const [isOrderForm, setIsOrderForm] = useState<boolean>(false)


  return (
    <>
      <div className={cl.header}>
        <h1>Custom Collection</h1>
      </div>
      <div className={cl.carouselSection}>
        <div className={cl.btnsContainer}>
          <div className={cl.btns}>
            <Button>Valhalla</Button>
            <Button>Cannibal</Button>
            <Button>Suicide</Button>
            <Button onClick={() => setIsActive(!isActive)} active={isActive}>
              Behemoth
            </Button>
          </div>
        </div>
        <div className={cl.carousel}>
          <Carousel />
        </div>
      </div>
      <div className={cl.descriptionSection}>
        <div className={cl.orderBtn}>
          <Button onClick={() => setIsOrderForm(true)}>Заказать Кастом</Button>
        </div>
        <div className={cl.description}>
          <h3>Кастомная касуха Cannibal Corpse.</h3>
          <p>
            Смотри, дэто же - чертова косуха c Cannibal Corpse. Джорж, мать его,
            Фишер заценит такой пригид, когда перстанет вызывать Торнадо своей
            шеей и обратит внимание дэтот шедевр отечественного кожевельного
            ремесла.
          </p>
          <p>
            Дэто делалась не очумелыми ручками в дестком кружке по рисованию, а
            таким же трушником, как ты...только талантливее в разы (чсв шутка,
            не принимать близко к бессердечию.)
          </p>
          <p>Сделано с ненавистью к тебе и с любовью к металу.</p>
        </div>
      </div>

      <Footer />
      {isOrderForm && (
        <Modal onClose={() => setIsOrderForm(false)}><CustomOdrerForm/></Modal>
      )}
      <Sidebar/>
    </>
  );
};

export default Custom;
