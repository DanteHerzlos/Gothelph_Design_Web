import { NextApiHandler } from "next";
import formidable from "formidable";
import dbConnect from "@lib/dbConnect";
import Product from "@models/Product";
import Category from "@models/Category";
import { IImage } from "types/IImage";
import { isValidObjectId } from "mongoose";
import { getSession } from "next-auth/react";
import { firebaseStorageService } from "@lib/firebaseStorageService";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const { query } = req;
  const { id } = query;
  const session = getSession({ req });
  if (req.method === "GET") {
    try {
      await dbConnect();

      if (!isValidObjectId(id)) {
        return res.status(404).send({ notFound: true });
      }
      const product = await Product.findById(id);

      if (product === null) {
        return res.status(404).send({ notFound: true });
      }
      return res.status(200).send(product);
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
      const product = await Product.findByIdAndDelete(id);
      if (product.category.match(/^[0-9a-fA-F]{24}$/)) {
        await Category.findByIdAndUpdate(product.category, {
          $pull: { products: product._id },
        });
      }
      if (product.imgs.length) {
        for (const img of product.imgs) {
          await firebaseStorageService.delete(img.url);
          console.log("file has been deleted: " + img.url);
        }
      }
      return res.status(200).send(product);
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
