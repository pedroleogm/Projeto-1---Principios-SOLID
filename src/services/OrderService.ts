import { IOrderRepository } from '../repositories/IOrderRepository';
import { NotificationService } from './NotificationService';
import { IPaymentMethod } from '../payments/IPaymentMethod';
import { ProductFactory } from '../domain/ProductFactory';

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private notificationService: NotificationService
  ) {}

  async processOrder(
    customer: string,
    items: Array<{ productId: number; quantity: number }>,
    paymentStrategy: IPaymentMethod,
    paymentDetails: any
  ) {
    if (!items || items.length === 0) {
      throw new Error('Carrinho vazio');
    }

    let totalAmount = 0;
    const productsDetails = [];

    for (const item of items) {
      const productData = await this.orderRepository.findProductById(item.productId);

      if (!productData) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }

      const product = ProductFactory.createProduct(productData);
      const itemSubtotal = product.price * item.quantity;
      const freight = product.calculateFreight();

      totalAmount += itemSubtotal + freight;

      productsDetails.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    await paymentStrategy.process(totalAmount, paymentDetails);

    const order = await this.orderRepository.createOrder(customer, productsDetails, totalAmount);

    const emailPreview = await this.notificationService.sendOrderConfirmation(
      customer,
      order.id,
      totalAmount,
      productsDetails
    );

    return {
      orderId: order.id,
      total: totalAmount,
      emailPreview,
    };
  }
}