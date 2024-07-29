import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const verifyUrl =
    `http://localhost:3000/api/v1/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Verify Email",
    html: `<a href="${verifyUrl}">Verify Email</a>`,
  });
}