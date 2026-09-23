import nodemailer from "nodemailer";

function transporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
  });
}

export async function sendNotification(to: string, subject: string, text: string) {
  if (!process.env.SMTP_HOST) {
    console.log(`[email:skipped] ${subject} -> ${to}\n${text}`);
    return;
  }
  try {
    await transporter().sendMail({ from: process.env.EMAIL_FROM, to, subject, text });
  } catch (e) {
    console.error("Email send failed", e);
  }
}
