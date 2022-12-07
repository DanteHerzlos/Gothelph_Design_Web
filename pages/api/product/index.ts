import { NextApiHandler } from "next";
import formidable from "formidable";
import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import { IProductDB } from "../../../types/IProduct";
import { IImage } from "../../../types/IImage";
import Img from "../../../models/Img";

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

        const imgs:IImage[] = JSON.parse(fields.imgs as string);
        const sizes = (fields.sizes as string).split(',').map(el => el.trim())
        
        const productData: IProductDB = {
          title: fields.short_title as string,
          long_title: fields.long_title as string,
          body: fields.body as string,
          price: fields.price as string,
          sizes: sizes,
          imgs: imgs.map((el) => el._id) as string[],
          category: fields.category as string,
        };
        const newProduct = await Product.create(productData);

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
      }).populate({path: 'imgs', model: Img})

      return res.status(200).send(products);
    } catch (error: any) {     
      return res.status(500).send(error.message);
    }
  }
};

export default handler;
