import { ICons } from '../interfaces/consultation.interface';
export class Cons implements ICons{
    constructor(
        public id: any,
        public name: string,
        public phone: string,
        public status: boolean,
        public date: any
    ){}
}