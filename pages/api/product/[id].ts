import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import fs from "fs";
import saveFile from "../../../handlers/saveFile";
import formidable, { File } from "formidable";
import updateFiledataToDB from "../../../handlers/updateFiledataToDB";
import Img from "../../../models/Img";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { query } = req;
    const { id } = query;
    try {
      await dbConnect();
      const product = await Product.findById(id).populate({path: "imgs", model: Img});
      return res.status(200).send(product);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }

  if (req.method === "DELETE") {
    try {
      const { query } = req;
      const { id } = query;
      await dbConnect();
      const product = await Product.findByIdAndDelete(id);
      // if (product) {
      //   const path = "./public/" + product.url_img;
      //   fs.unlinkSync(path);
      //   console.log("file has been delete: " + path);
      // }

      return res.status(200).send(product);
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
        //     let productData;
        // if (data.hasOwnProperty("file")) {
        //   const product = await Product.findById(id);
        // const path = saveFile(data.file as File, product.type as string);
        //   fs.unlinkSync("./public" + product.url_img);
        //   console.log("delete file: ", "./public" + product.url_img);
        //   productData = {
        //     title: fields.product as string,
        //     url_img: path,
        //   };
        // } else {
        //   productData = {
        //     title: fields.product as string,
        //   };
        // }
        // const updatedProduct = await updateFiledataToDB(
        //   id as string,
        //   productData
        // );
        return res.status(200).send("updatedProduct");
      } catch (error: any) {
        return res.status(500).send(error.message);
      }
    });
  }
};

export default handler;
