import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Category";
import fs from "fs";

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
};

export default handler;
