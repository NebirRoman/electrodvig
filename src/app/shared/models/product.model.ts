import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/category.interface';

export class Product implements IProduct {
    constructor(
        public id: any,
        public category: ICategory,
        public name: string,
        public description: string,
        public set: string,
        public price: number,
        public images: Array<string>,
    ) {}
}