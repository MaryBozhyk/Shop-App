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
