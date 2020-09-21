import { Injectable } from '@angular/core';

import * as uuid from 'uuid';

import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersList: Order[] = [];

  private id = 0;

  constructor() { }

  setOrder(order, sum, quantity): void {
    this.id += this.id;
    const myId = uuid.v4();
    const date = Date.now();

    this.ordersList.push({
      id: myId,
      date,
      order: [...order],
      sum,
      quantity
    });
  }

  getOrders(): Order[] {
    return this.ordersList;
  }
}
