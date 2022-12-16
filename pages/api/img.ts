import formidable, { File } from "formidable";
import { NextApiHandler } from "next";
import fs from "fs";
import saveFile from "@handlers/saveFile";
import Product from "@models/Product";
import { getSession } from "next-auth/react";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const session = getSession({ req });

  if (req.method === "POST") {
    if (!session) {
      return res
        .status(403)
        .send({ message: "Неавторизованный пользователь!" });
    }
    let path: string | null = null;
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, data) => {
      try {
        path = saveFile(data.file as File, fields.type as string);
        const imgData = {
          url: path,
          position: fields.position,
        };
        return res.status(201).send(imgData);
      } catch (error: any) {
        if (path !== null) {
          fs.unlinkSync(path);
          console.log("file has been deleted: " + path);
        }
        return res.status(500).send(error.message);
      }
    });
  }

  if (req.method === "DELETE") {
    if (!session) {
      return res
        .status(403)
        .send({ message: "Неавторизованный пользователь!" });
    }
    try {
      const { query } = req;

      const product = await Product.findById(query["product"]);

      for (const img of product.imgs) {
        const path = "./public" + img.url;
        fs.unlinkSync(path);
        console.log("file has been deleted: " + path);
      }
      return res.status(200).send({ message: "ok" });
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
};

export default handler;
