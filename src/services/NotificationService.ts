import { IMailProvider } from '../providers/IMailProvider';

export class NotificationService {
  constructor(private mailProvider: IMailProvider) {}

  async sendOrderConfirmation(email: string, orderId: number, total: number, items: any[]): Promise<string | null> {
    const subject = `Confirmação do Pedido #${orderId}`;
    const html = `
      <h1>Pedido Confirmado!</h1>
      <p>Olá, o seu pedido <b>#${orderId}</b> foi processado com sucesso.</p>
      <p>Total: <strong>R$ ${total.toFixed(2)}</strong></p>
      <ul>
        ${items.map((p) => `<li>${p.name}</li>`).join('')}
      </ul>
    `;

    return await this.mailProvider.sendMail(email, subject, html);}
}