import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import fs from "fs";
import formidable from "formidable";
import Category from "../../../models/Category";
import { IImage } from "../../../types/IImage";

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
      const product = await Product.findById(id);
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
      if (product.category.match(/^[0-9a-fA-F]{24}$/)) {
        await Category.findByIdAndUpdate(product.category, {
          $pull: { products: product._id },
        });
      }
      if (product.imgs.length) {
        for (const img of product.imgs) {
          const path = "./public" + img.url;
          fs.unlinkSync(path);
          console.log("file has been deleted: " + path);
        }
      }
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

        const imgs: IImage[] = JSON.parse(fields.imgs as string);
        const sizes = (fields.sizes as string)
          .split(",")
          .map((el) => el.trim());

        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          {
            title: fields.short_title as string,
            long_title: fields.long_title as string,
            body: fields.body as string,
            price: fields.price as string,
            sizes: sizes,
            imgs: imgs,
          },
          { new: true }
        );

        return res.status(201).send(updatedProduct);
      } catch (error: any) {
        return res.status(500).send(error.message);
      }
    });
  }
};

export default handler;
