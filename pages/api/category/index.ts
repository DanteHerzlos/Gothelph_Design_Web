import { NextApiHandler } from "next";
import formidable, { File } from "formidable";
import dbConnect from "@lib/dbConnect";
import Category from "@models/Category";
import saveFile from "@handlers/saveFile";
import saveFiledataToDB from "@handlers/saveFiledataToDB";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, data) => {
      try {
        await dbConnect();

        const path = saveFile(data.file as File, fields.type as string);
        
        const categoryData = {
          title: fields.category as string,
          type: fields.type as string,
          body: fields.body as string,
          url_img: path,
        };
        const newCategory = await saveFiledataToDB(categoryData);

        return res.status(201).send(newCategory);
      } catch (error: any) {
        return res.status(500).send(error.message);
      }
    });
  }

  if (req.method === "GET") {
    try {
      await dbConnect();
      const categories = await Category.find({ type: req.query["type"] });   
      return res.status(200).send(categories);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
};



export default handler;
