
import { Category } from './';

export interface Product {
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
    sizes?: Array<number>;
    color: string;
    photo: string;
}

export interface CartItem {
    photo: string;
    name: string;
    price: number;
    quantity: number;
}
