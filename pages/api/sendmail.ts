import mail from "@lib/mail";
import formidable from "formidable";
import { NextApiHandler } from "next";
import { IMessage } from "types/IMessage";

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
        const newMessage = {
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          city: fields.city,
          order: fields.order,
          message: fields.message,
        } as IMessage;

        const message = await mail.sendMail(newMessage);
        return res.status(201).send({ message: message });
      } catch (error: any) {
        return res.status(500).send(error.message);
      }
    });
  }
};

export default handler;
