import React from "react";
import GallerySlider from "../components/GallerySlider";
import ItemInfo from "../components/ItemInfo";

const Test = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GallerySlider><ItemInfo/></GallerySlider>
    </div>
  );
};

export default Test;
