import nodemailer, {
  Transporter,
  SendMailOptions,
  TransportOptions,
} from "nodemailer";
import AppError from "./appError";
import { StatusCodes } from "http-status-codes";

interface IEmail {
  to: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: IEmail) => {
  // 1) Create a transporter
  const transporter: Transporter<TransportOptions & SendMailOptions> =
    nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      debug: true,
      auth: {
        user: "3925e6b0d42075",
        pass: "3dc448fd0eadc3",
      },
    });

  // 2) Define the email options
  const mailOptions = {
    from: "BookmyDoc <noreply@bookmydoctor.com>",
    to: options.to,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email

  try {
    await transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new AppError(
      "There was an error sending the email. Try again later!",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export default sendEmail;
