import { FormAdoption } from "@prisma/client";

let nodemailer = require ('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    XOAuth2: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  }
});

export const sendEmail = (to: string, type: string) => {
    const mailOptions = {
        from: 'petMatch@gmail.com',
        to: to,
        subject: type === "request_adoption" ? "Solicitação de adoção" : "Resposta pedido de adoção",
        html: type === "request_adoption" ? `<h2>Você recebeu uma solicitação de adoção </h2>` : `<h2>Você recebeu um retorno de solicitação de adoção</h2>`
    }
    transporter.sendMail(mailOptions, (err: any, info: any) => {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

