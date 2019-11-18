import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { OrdersService } from '../shared/orders.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  totalSum: number;
  @Output() totalSumFound = new EventEmitter<number>();

  coffees = [
    { product: 'A-meow-ricano', price: 4 },
    { product: 'Cat-uccino', price: 3 },
    { product: 'Latte', price: 2 },
    { product: 'Meow-chiatto', price: 3 },
    { product: 'Mocha', price: 2 },
    { product: 'Kit-Tea', price: 2 }
  ];

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

  // remove cafe from pending order list
  removeCoffee = coffee => {
    // returns the index within the calling this.coffeeOrder object of the first occurrence
    // of the specified value, starting the search at -1 if the value is not found.
    // declaring the index
    const index = this.coffeeOrder.indexOf(coffee);
    // changes the content of an array, adding new elements while removing old elements.
    // index - index at where to start changing array
    // howMany - an int indicating the # of old array elements to remove, if 0 none are removed
    if (index > -1) { this.coffeeOrder.splice(index, 1); }
  }

  // cancel pending order list
  cancel() {
    this.showSubmit = false; // hides buttons
    this.coffeeOrder = []; // clears array
  }

  onSubmit() {
    // map the coffeeOrder array to the form value coffeeOrder
    this.ordersService.form.value.coffeeOrder = this.coffeeOrder;

    // assign data to form value
    const data = this.ordersService.form.value;

    // works but refactor
    // adds the sum of products in order
    let sum = 0;
    this.coffeeOrder.forEach(obj => {
      for (const property in obj) {
        if (property !== 'product') {
          sum += obj[property];
        }
      }
    });

    this.totalSum = sum;

    // emit the sum
    this.totalSumFound.emit(sum);

    // this adds total cost to front of coffeeOrder array
    this.coffeeOrder.unshift({ totalCost: sum });


    // create order
    this.ordersService.createCoffeeOrder(data);
    //  .then(res => {
    // read up more on how to use promises
    //  });


    // creates an object of all the prices
    // const prices = this.coffees.map( coffees => coffees.price );

    console.log('the data: ', data);

    // hides buttons
    this.showSubmit = false;

    // clears array
    this.coffeeOrder = [];

    // resets form
    this.ordersService.form.reset();

    console.log('Order has been submitted!');

  }

  ngOnInit() {
    // validation
    this.ordersService.form = new FormGroup({
      orderNumber: new FormControl('', [Validators.required, Validators.minLength(2)]),
      customerName: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

}
