import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { PrismaOrderRepository } from '../repositories/PrismaOrderRepository';
import { NotificationService } from '../services/NotificationService';
import { EtherealMailProvider } from '../providers/EtherealMailProvider';
import { CreditCardPayment } from '../payments/CreditCardPayment';
import { PixPayment } from '../payments/PixPayment';
import { IPaymentMethod } from '../payments/IPaymentMethod';
import logger from '../lib/logger';

export class OrderController {
  async processOrder(req: Request, res: Response) {
    try {
      const { customer, items, paymentMethod, paymentDetails } = req.body;

      let paymentStrategy: IPaymentMethod;
      if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
        paymentStrategy = new CreditCardPayment();
      } else if (paymentMethod === 'pix') {
        paymentStrategy = new PixPayment();
      } else {
        return res.status(400).json({ error: 'Método de pagamento não suportado' });
      }

      const orderRepo = new PrismaOrderRepository();
      const mailProvider = new EtherealMailProvider();
      const notificationService = new NotificationService(mailProvider);
      const orderService = new OrderService(orderRepo, notificationService);

      const result = await orderService.processOrder(
        customer,
        items,
        paymentStrategy,
        paymentDetails
      );

      return res.status(201).json({
        message: 'Pedido processado com sucesso',
        ...result,
      });
    } catch (error: any) {
      logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(400).json({ error: error.message || 'Erro ao processar pedido' });
    }
  }
}