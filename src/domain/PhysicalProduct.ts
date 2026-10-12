import { Product } from './IProduct';

export class PhysicalProduct implements Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public weight?: number,
    public dimensions?: string )
     {}

  calculateFreight(): number {
    return 10.0;}
}