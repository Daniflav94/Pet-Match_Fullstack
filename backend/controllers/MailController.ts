import { transporter } from "../config/mailConfig";
import { nodemailerMjmlPlugin } from "nodemailer-mjml";
import { join } from "path";

transporter.use(
  "compile",
  nodemailerMjmlPlugin({ templateFolder: join(__dirname, "../mailTemplates") })
);

export const sendEmail = async (to: string, type: string) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject:
      type === "request_adoption"
        ? "Solicitação de adoção"
        : "Resposta pedido de adoção",
      templateName: type === "request_adoption" ? "requestAdoption" : "responseAdoption",
      templateData: {
        logo: join(__dirname, '../assets/img/logo.png'),
        dogImage:join(__dirname, '../assets/img/dog.png')
      },
      attachments: [{
        filename: "logo.png",
        path: join(__dirname, '../assets/img/logo.png'),
        cid: 'logo'
    },
    {
      filename: "dog.png",
      path:  join(__dirname, '../assets/img/dog.png'),
      cid: 'dog'
  }],
    
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado!");
  } catch (error) {
    console.error(error);
  }
};
