import { CartItem } from '../../shared';

export interface Order {
    id: number;
    date: number;
    order: CartItem[];
    sum: number;
    quantity: number;
}
