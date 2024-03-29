import { NextApiHandler } from "next";
import formidable from "formidable";
import dbConnect from "@lib/dbConnect";
import Product from "@models/Product";
import Category from "@models/Category";
import { IProduct } from "types/IProduct";
import { IImage } from "types/IImage";
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
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, data) => {
      try {
        await dbConnect();
        const category = fields.category as string;
        const imgs: IImage[] = JSON.parse(fields.imgs as string);
        const sizes = (fields.sizes as string)
          .split(",")
          .map((el) => el.trim());

        const productData: IProduct = {
          title: fields.short_title as string,
          long_title: fields.long_title as string,
          body: fields.body as string,
          price: fields.price as string,
          sizes: sizes,
          imgs: imgs,
          category: category,
        };
        const newProduct = await Product.create(productData);
        if (category.match(/^[0-9a-fA-F]{24}$/)) {
          await Category.findByIdAndUpdate(fields.category, {
            $push: { products: newProduct._id },
          });
        }
        return res.status(201).send(newProduct);
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
