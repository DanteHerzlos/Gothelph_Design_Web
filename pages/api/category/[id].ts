import { NextApiHandler } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
import dbConnect from "@lib/dbConnect";
import Product from "@models/Product";
import Category from "@models/Category";
import saveFile from "@handlers/saveFile";
import updateFiledataToDB from "@handlers/updateFiledataToDB";
import { isValidObjectId } from "mongoose";
import { getSession } from "next-auth/react";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const { query } = req;
  const { id } = query;
  const session = await getSession({ req });

  if (req.method === "GET") {
    try {
      await dbConnect();
      if (!isValidObjectId(id)) {
        return res.status(404).send({ notFound: true });
      }
      const category = await Category.findById(id).populate({
        path: "products",
        model: Product,
      });
      if (category === null) {
        return res.status(404).send({ notFound: true });
      }
      return res.status(200).send(category);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }

  if (req.method === "DELETE") {
    if (!session) {
      return res
        .status(403)
        .send({ message: "Неавторизованный пользователь!" });
    }
    try {
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
    if (!session) {
      return res
        .status(403)
        .send({ message: "Неавторизованный пользователь!" });
    }
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
