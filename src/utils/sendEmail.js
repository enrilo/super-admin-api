import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async ({ to, subject, template, context }) => {
  // 1️⃣ Create transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // your App Password
    },
  });

  // 2️⃣ Configure Handlebars templates
  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs",
        layoutsDir: path.join(__dirname, "../templates"),
        defaultLayout: false,
      },
      viewPath: path.join(__dirname, "../templates"),
      extName: ".hbs",
    })
  );

  // 3️⃣ Send email
  const info = await transporter.sendMail({
    from: `"Enrilo Support" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    template,
    context,
  });

  console.log("✅ Email sent:", info.messageId);
};
