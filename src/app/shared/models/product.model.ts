import { Category } from '../enums/category.enum';

export interface Product {
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

// Я, думаю, лучше перенести в свой собственный модуль
export interface CartItem {
    photo: string;
    name: string;
    price: number;
    size: number;
    quantity: number;
}
