import { Category } from '../enums/category.enum';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
    quantity?: Array<number>;
    sizes?: Array<number>;
    color: string;
    photo: string;
}

export class ProductModel implements Product {
    constructor(
        public id: string = null,
        public name: string = '',
        public description: string = '',
        public price: number = 0,
        public category: Category = Category.Running,
        public isAvailable: boolean = false,
        public color: string = '',
        public photo: string = '',
        public quantity?: Array<number>,
        public sizes?: Array<number>
    ) {
        this.quantity = quantity || [];
        this.sizes = sizes || [];
    }
}
