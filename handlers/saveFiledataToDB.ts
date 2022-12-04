import Category from "../models/Category";
import { ICategory } from "../types/ICategory";
import fs from 'fs'

const saveFiledataToDB = async (data: ICategory) => {
  try {
    return await Category.create({ ...data });
  } catch (error) {
    fs.unlinkSync(data.url_img);
    console.log("delete file: ", data.url_img);
  }
};

export default saveFiledataToDB;