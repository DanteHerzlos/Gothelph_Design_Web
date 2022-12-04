import React from "react";
import ClothesLayout from "../../../components/layouts/ClothesLayout";
import GallerySlider from "../../../components/GallerySlider";
import ItemInfo from "../../../components/ItemInfo";
import cl from "../../../styles/ProductItem.module.sass";

const ClothesItem = () => {
  return (
    <ClothesLayout title="Название товара">
      <div className={cl.body}>
        <GallerySlider>
          <ItemInfo />
        </GallerySlider>
      </div>
      <div className={cl.delivery_info}>
        <h2> ДОСТАВКА В МОСКВА</h2>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
          nulla orci. Sed sodales eros in tempus mollis. Pellentesque lobortis
          arcu at tincidunt vehicula. Integer quis eros turpis. Fusce ut porta
          massa, in tempor ex. Aliquam aliquet, tellus eu efficitur semper, odio
          dolor aliquet arcu, nec consectetur magna eros at nulla. Morbi cursus
          justo in ultrices fringilla.
        </p>
      </div>
    </ClothesLayout>
  );
};

export default ClothesItem;
