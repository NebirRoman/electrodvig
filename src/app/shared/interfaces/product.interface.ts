import { ICategory } from './category.interface';

export interface IProduct{
    id: any;
    category: ICategory;
    name: string;
    description: string;
    set: string;
    price: number;
    images: Array<string>;
}