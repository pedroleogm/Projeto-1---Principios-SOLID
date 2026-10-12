export interface IPaymentMethod {
  process(amount: number, details: any): Promise<boolean>;
}