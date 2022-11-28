import React from 'react'
import ClothesLayout from '../../../components/ClothesLayout';
import GallerySlider from '../../../components/GallerySlider';
import ItemInfo from '../../../components/ItemInfo';
import cl from '../../../styles/ClothesItem.module.sass'

const ClothesItem = () => {
  return (
    <ClothesLayout title='Название товара'>
      <div className={cl.body}> 
        <GallerySlider><ItemInfo/></GallerySlider>
      </div>
    </ClothesLayout>
  );
}

export default ClothesItem;