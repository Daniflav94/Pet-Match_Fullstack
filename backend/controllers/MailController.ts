import { User } from "@prisma/client";
import { transporter } from "../config/mailConfig";
import { nodemailerMjmlPlugin } from "nodemailer-mjml";
import { join } from "path";

transporter.use(
  "compile",
  nodemailerMjmlPlugin({ templateFolder: join(__dirname, "../mailTemplates") })
);

export const sendEmailAdoption = async (to: string, type: string) => {
  let templateName;
  let subject;

  if (type === "request_adoption") {
    templateName = "requestAdoption";
    subject = "Solicitação de adoção";
  } else if (type === "response_adoption") {
    templateName = "responseAdoption";
    subject = "Resposta pedido de adoção";
  } 

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject: subject,
    templateName: templateName,
    templateData: {
      logo: join(__dirname, "../assets/img/logo.png"),
      dogImage: join(__dirname, "../assets/img/dog.png"),
    },
    attachments: [
      {
        filename: "logo.png",
        path: join(__dirname, "../assets/img/logo.png"),
        cid: "logo",
      },
      {
        filename: "dog.png",
        path: join(__dirname, "../assets/img/dog.png"),
        cid: "dog",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado!");
  } catch (error) {
    console.error(error);
  }
};

export const sendEmailHelpOng = async (to: string, pet?: string, user?: Partial<User>) => {
   const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject: "Solicitação de apadrinhamento",
    templateName: "helpOng",
    templateData: {
      logo: join(__dirname, "../assets/img/logo.png"),
      dogImage: join(__dirname, "../assets/img/dog.png"),
      nameUser: user?.name,
      emailUser: user?.email,
      pet: pet,
    },
    attachments: [
      {
        filename: "logo.png",
        path: join(__dirname, "../assets/img/logo.png"),
        cid: "logo",
      },
      {
        filename: "dog2.jpeg",
        path: join(__dirname, "../assets/img/dog2.jpeg"),
        cid: "dog",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado!");
  } catch (error) {
    console.error(error);
  }
};

export const sendEmailResetPassword = async (to: string, code: number) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject: "Redefinir senha",
    templateName: "resetPassword",
    templateData: {
      logo: join(__dirname, "../assets/img/logo.png"),
      dogImage: join(__dirname, "../assets/img/dog.png"),
      code: code
    },
    attachments: [
      {
        filename: "logo.png",
        path: join(__dirname, "../assets/img/logo.png"),
        cid: "logo",
      },
      {
        filename: "dog3.png",
        path: join(__dirname, "../assets/img/dog3.png"),
        cid: "dog3",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado!");
  } catch (error) {
    console.error(error);
  }
}
