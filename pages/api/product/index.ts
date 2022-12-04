import { NextApiHandler } from "next";
import formidable, { File } from "formidable";
import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import saveFile from "../../../handlers/saveFile";
import saveFiledataToDB from "../../../handlers/saveFiledataToDB";

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

        // const path = saveFile(data.file as File, fields.category as string);
        const productData = {
          title: fields.short_title as string,
          type: fields.category as string,
          // url_img: path,
        };
        // const newProduct = await saveFiledataToDB(productData);

        return res.status(201).send('newProduct');
      } catch (error: any) {
        return res.status(500).send(error.message);
      }
    });
  }

  if (req.method === "GET") {
    try {
      await dbConnect();
      const products = await Product.find({
        category: req.query["category"],
      });
      return res.status(200).send(products);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
};

export default handler;
