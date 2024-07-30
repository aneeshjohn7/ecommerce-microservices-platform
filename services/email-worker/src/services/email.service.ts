import nodemailer from 'nodemailer';
import { config } from '../config/env';



const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  //secure: false, // true for 465, false for other ports
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password,
  },
});


export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${config.app.verificationBaseUrl}/api/v1/auth/verify-email?token=${encodeURIComponent(token)}`;

  await transporter.sendMail({
    from: config.email.from,
    to: email,
    subject: 'Verify Email',
    text: `Please verify your email by visiting: ${verifyUrl}`,
    html: `
  <p>Please verify your email address.</p>
  <p>
    <a href="${verifyUrl}">Verify Email</a>
  </p>
`,
  });
  console.log(`Verification email sent to ${email}`);
}
