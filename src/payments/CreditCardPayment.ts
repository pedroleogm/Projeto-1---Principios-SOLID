import { IPaymentMethod } from './IPaymentMethod';
import logger from '../lib/logger';

export class CreditCardPayment implements IPaymentMethod {
  async process(amount: number, details: any): Promise<boolean> {
    if (!details || !details.cardNumber || !details.cvv) {
      throw new Error('Dados do cartão incompletos');
    }

    logger.info(`Processando cartão final ${details.cardNumber.slice(-4)} no valor de R$ ${amount.toFixed(2)}`);

    if (details.cvv === '000') {
      throw new Error('Cartão recusado');
    }

    return true;}
}