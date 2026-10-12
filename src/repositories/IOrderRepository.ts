export interface IOrderRepository {
  findProductById(id: number): Promise<any>;
  createOrder(customer: string, itemsDetails: any[], total: number): Promise<any>;
}