import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async resetPasswordEmail(to: string, link: string) {
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Password Recovery',
      text: `Click the following link to reset your password: ${link}`,
      html: `<p>Click the following link to reset your password:</p><a href="${link}">Reset Password</a>`,
    };

    await sgMail.send(msg);
  }

  async mailConfirm(to: string, type: string) {
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `${type} Confirmation`,
      text: `Your ${type} has been confirmed.`,
      html: `
        <p>Your ${type} has been confirmed!</p>`,
    };

    await sgMail.send(msg);
  }
}
