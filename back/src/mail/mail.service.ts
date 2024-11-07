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

  async mailBanUser(reason: string, to: string) {
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Account Ban Notification`,
      text: `${reason}`,
      html: `
        <p>${reason}</p>`,
    };

    await sgMail.send(msg);
  }

  async mailWelcome(to: string, userName: string) {
    const emailContent = `
     <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to Club Fellini Bar, ${userName}!</h2>
        <p>Dear ${userName},</p>
        <p>Thank you for registering with Club Fellini Bar, your destination for great dining and convenience!</p>
        <p>At Club Fellini, you can make table reservations, order delicious meals for delivery or take-away, and enjoy our varied menu with options for breakfast, lunch, snacks, and dinner.</p>
        <p>Whether you prefer dining indoors or outdoors, paying with cash or card, we’re here to provide a seamless experience.</p>
        <p>To get started, you can <a href="https://final-project-blush-gamma.vercel.app/login" style="color: #1a73e8;">log in to your account here</a> and explore our offerings.</p>
        <p>If you have any questions or need assistance, feel free to reach out to us. We're here to make your Club Fellini experience enjoyable and easy.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>The Club Fellini Bar Team</strong></p>
        <p><em>Your place for memorable meals and convenient dining.</em></p>
      </div>
    `;
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Welcome to Club Fellini Bar!',
      html: emailContent,
    };

    await sgMail.send(msg);
  }

  async mailPaymentCancel(to: string) {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Payment Canceled or Rejected`,
      text: `Your payment was canceled or rejected. Please try again.`,
      html: `
        <p>Your payment was canceled or rejected. Please try again.</p>`,
    };

    await sgMail.send(msg);
  }
}
