import nodemailer, { TransportOptions } from "nodemailer";
import { IMessage } from "types/IMessage";

class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    } as TransportOptions);
  }

  async sendMail(msg: IMessage) {
    return await this.transporter.sendMail({
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM,
      subject: "Gothelph Design new Message",
      text: "",
      html: `
        <div>
            <strong>Имя:</strong> ${msg.name}<br><br>
            <strong>Телефон:</strong> ${msg.phone}<br><br>
            <strong>Email:</strong> ${msg.email}<br><br>
            <strong>City:</strong> ${msg.city}<br><br>
            <strong>Order:</strong> ${msg.order}<br><br>
            <strong>Сообщение:</strong><br>${msg.message}
        </div>
        `,
    });
  }
}

export default new MailService();
