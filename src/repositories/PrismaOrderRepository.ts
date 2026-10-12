import { IOrderRepository } from './IOrderRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaOrderRepository implements IOrderRepository {
  async findProductById(id: number): Promise<any> {
    return await prisma.product.findUnique({ where: { id } });
  }

  async createOrder(customer: string, itemsDetails: any[], total: number): Promise<any> {
    return await prisma.order.create({
      data: {
        customer,
        items: JSON.stringify(itemsDetails),
        total,
        status: 'confirmed',},
    });
  }
}