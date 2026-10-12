export interface IMailProvider {
  sendMail(to: string, subject: string, bodyHtml: string): Promise<string | null>;
}