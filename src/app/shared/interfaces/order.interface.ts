import { IProduct } from './product.interface';
export interface IOrder{
    id: any;
    name: string;
    phone: string;
    orderDetails: IProduct;
    delivery: string;
    date: any;
    address: string;
    status: string;
    comment: string;
}