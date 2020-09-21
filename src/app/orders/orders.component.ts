import { Component, OnInit } from '@angular/core';

import { OrdersService } from './services/orders.service';
import { Order } from './models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.orders = this.ordersService.getOrders();
  }

}
