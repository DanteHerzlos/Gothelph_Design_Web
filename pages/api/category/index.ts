import { NextApiHandler } from "next";
import formidable from "formidable";
import dbConnect from "@lib/dbConnect";
import Category from "@models/Category";
import saveFiledataToDB from "@handlers/saveFiledataToDB";
import { getSession } from "next-auth/react";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, data) => {
      try {
        if (!session) {
          return res
            .status(403)
            .send({ message: "Неавторизованный пользователь!" });
        }
        await dbConnect();
        
        const categoryData = {
          title: fields.category as string,
          type: fields.type as string,
          body: fields.body as string,
          url_img: fields.fileUrl as string,
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
