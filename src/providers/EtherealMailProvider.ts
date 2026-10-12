import { IMailProvider } from './IMailProvider';
import { getMailClient } from '../lib/mail';
import nodemailer from 'nodemailer';
import logger from '../lib/logger';

export class EtherealMailProvider implements IMailProvider {
  async sendMail(to: string, subject: string, bodyHtml: string): Promise<string | null> {
    const mailer = await getMailClient();

    const info = await mailer.sendMail({
      from: '"DevStore" <noreply@devstore.com>',
      to,
      subject,
      html: bodyHtml,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    logger.info(`E-mail enviado: ${previewUrl}`);
    return typeof previewUrl === 'string' ? previewUrl : null;}
}