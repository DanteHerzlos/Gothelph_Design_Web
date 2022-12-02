import { NextApiHandler } from "next";
import formidable, { File } from "formidable";
import { dirname } from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import dbConnect from "../../lib/dbConnect";
import Category from "../../models/Category";
import { ICategory } from "../../types/ICategory";

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
        
        const path = saveFile(data.file as File, fields.type as string);
        const categoryData = {
          title: fields.category as string,
          type: fields.type as string,
          url_img: path,
        };
        const newCategory = await saveToDB(categoryData);

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
      return res.status(200).json({ success: true, data: categories });
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
};

const saveToDB = async (data: ICategory) => {
  try {
    return await Category.create({ ...data });
  } catch (error) {
    fs.unlinkSync(data.url_img);
    console.log("delete file: ", data.url_img);
  }
};

const saveFile = (file: File, type: string) => {
  const data = fs.readFileSync(file.filepath);
  const ext = file.originalFilename?.split(".")[1];
  const uuid = randomUUID();
  const path = `./public/imgs/${type}/${uuid}.${ext}`;

  if (!fs.existsSync(dirname(path))) {
    fs.mkdirSync(dirname(path), { recursive: true });
  }

  fs.writeFileSync(path, data);
  return path.slice(8);
};

export default handler;
