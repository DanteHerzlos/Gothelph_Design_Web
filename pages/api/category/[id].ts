import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Category";
import fs from "fs";
import saveFile from "../../../handlers/saveFile";
import formidable, { File } from "formidable";
import updateFiledataToDB from "../../../handlers/updateFiledataToDB";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const { query } = req;
      const { id } = query;
      await dbConnect();
      const category = await Category.findByIdAndDelete(id);
      if (category) {
        const path = "./public/" + category.url_img;
        fs.unlinkSync(path);
        console.log("file has been delete: " + path);
      }

      return res.status(200).send(category);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }

  if (req.method === "PUT") {   
    const { query } = req;
    const { id } = query;
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, data) => {
      try {
        await dbConnect();
        let categoryData;
        if (data.hasOwnProperty("file")) {
          const category = await Category.findById(id);
          const path = saveFile(data.file as File, category.type as string);
          fs.unlinkSync("./public" + category.url_img);
          console.log("delete file: ", "./public" + category.url_img);
          categoryData = {
            title: fields.category as string,
            body: fields.body as string,
            url_img: path,
          };
        } else {
          categoryData = {
            title: fields.category as string,
            body: fields.body as string,
          };
        }
        const updatedCategory = await updateFiledataToDB(
          id as string,
          categoryData
        );
        return res.status(200).send(updatedCategory);
      } catch (error: any) {
        return res.status(500).send(error.message);
      }
    });
  }
};

export default handler;
