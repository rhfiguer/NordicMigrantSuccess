import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  private constructor(config: { user: string; pass: string }) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.pass
      }
    });
  }

  static initialize(config: { user: string; pass: string }) {
    return new EmailService(config);
  }

  async sendEmail(to: string, subject: string, html: string) {
    return await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    });
  }
}