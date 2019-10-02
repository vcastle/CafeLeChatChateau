import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  coffees = ['Americano', 'Flat White', 'Cappuccino', 'Latte', 'Espresso', 'Machiato', 'Mocha', 'Hot Chocolate', 'Tea'];
  coffeeOrder = []; // house cafe order
  showSubmit = false;

  // now you can use the object inside your component
  // and then create an object of the class inside the constructor
  constructor(public ordersService: OrdersService) { }

  // add cafe to order list
  addCoffee = coffee => {
    this.coffeeOrder.push(coffee); // add new coffees to array
    this.showSubmit = true;
  }

  // remove cafe from order list
  removeCoffee = coffee => {
      const index = this.coffeeOrder.indexOf(coffee);
      if (index > -1) { this.coffeeOrder.splice(index, 1); }
  }

  onSubmit() {
    // map the coffeeOrder array to the form value coffeeOrder
    this.ordersService.form.value.coffeeOrder = this.coffeeOrder;
    // tslint:disable-next-line: prefer-const
    const data = this.ordersService.form.value;

    this.ordersService.createCoffeeOrder(data)
       .then(res => {
           /*do something here....
           maybe clear the form or give a success message*/
           alert('Order has been submitted!');
       });
   }

  ngOnInit() {}

}
