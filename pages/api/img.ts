import formidable, { File } from "formidable";
import { NextApiHandler } from "next";
import saveFile from "../../handlers/saveFile";
import dbConnect from "../../lib/dbConnect";
import Img from "../../models/Img";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    let path: string | null = null;
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, data) => {
      try {
        await dbConnect();
        path = saveFile(data.file as File, fields.type as string);
        const imgData = {
          url: path,
          position: fields.position,
        };
        const newImg = await Img.create(imgData);
        return res.status(201).send(newImg);
      } catch (error: any) {
        if (path !== null) {
          fs.unlinkSync(path);
          console.log("delete file: ", path);
        }
        return res.status(500).send(error.message);
      }
    });
  }
};

export default handler;
