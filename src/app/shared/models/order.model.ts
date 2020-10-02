import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';

export class Order implements IOrder{
    constructor(
        public id: any,
        public name: string,
        public phone: string,
        public orderDetails: IProduct,
        public delivery: string,
        public date: any,
        public address: string,
        public status: string,
        public comment: string
    ){}
}