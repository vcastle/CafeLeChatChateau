import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from '../shared/orders.service';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  // how do i reference total sum via orders component???
  // @Input() public totalSumResult: Array <any> = [];

  coffeeOrders;

  constructor(public ordersService: OrdersService) {}

  // fx loaded first
  ngOnInit() { this.getCoffeeOrders(); }

  // gets coffeeOrders collection from firestore db
  getCoffeeOrders = () =>
     this.ordersService
     .getCoffeeOrders()
     .subscribe(res => (this.coffeeOrders = res))

  // mark order as completed
  markCompleted = data =>
  this.ordersService.updateCoffeeOrder(data)

  // We’re going to pass in the instance of the order data in the loop when the ‘delete_forever’ icon gets clicked
  deleteOrder = data => this.ordersService.deleteCoffeeOrder(data);
}
