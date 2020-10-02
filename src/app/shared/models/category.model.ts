import { ICategory } from '../interfaces/category.interface';
export class Category implements ICategory {
    constructor(
        public id: any,
        public nameEN: string,
        public nameUA: string,
        public catImage: string,
        public promoImage: string
    ){}
}