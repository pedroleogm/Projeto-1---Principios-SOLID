import { IPaymentMethod } from './IPaymentMethod';
import logger from '../lib/logger';

export class PixPayment implements IPaymentMethod {
  async process(amount: number, details: any): Promise<boolean> {
    logger.info(`Gerando cobrança Pix no valor de R$ ${amount.toFixed(2)}`);
    return true;}
}