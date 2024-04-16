import { transporter } from "../config/mailConfig";

export const sendEmail = async(to: string, type: string) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject:
      type === "request_adoption"
        ? "Solicitação de adoção"
        : "Resposta pedido de adoção",
    html:
      type === "request_adoption"
        ? `<h2>Você recebeu uma solicitação de adoção </h2>`
        : `<h2>Você recebeu um retorno de solicitação de adoção</h2>`,
  };
  console.log(mailOptions)

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado!")
  } catch (error) {
    console.error(error)
  }
};
