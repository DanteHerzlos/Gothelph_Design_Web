import Category from "../models/Category";
import fs from "fs";


const updateFiledataToDB = async (id: string, data: any) => {
  try {
    return await Category.findByIdAndUpdate(id, { ...data }, {new: true});
  } catch (error) {
    fs.unlinkSync(data.url_img);
    console.log("delete file: ", data.url_img);
  }
};

export default updateFiledataToDB;
