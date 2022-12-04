import React from "react";
import AutoLayout from "../../components/layouts/AutoLayout";
import ImgSplitSlider from "../../components/ImgSplitSlider";
import Button from "../../components/UI/Button";
import cl from '../../styles/Auto.module.sass'

const Auto = () => {
  return (
    <AutoLayout title="автотовары">
      <div className={cl.slider_menu}>
        <div className={cl.menu}>
          <div className={cl.menu_btns}>
            <Button>Valhalla</Button>
            <Button>Cannibal</Button>
            <Button>Suicide</Button>
            <Button white>Behemoth</Button>
          </div>
        </div>
        <div className={cl.slider}>
          <ImgSplitSlider />
        </div>
      </div>
    </AutoLayout>
  );
};

export default Auto;
