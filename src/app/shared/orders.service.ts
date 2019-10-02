import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public firestore: AngularFirestore) {}

// use these values to store in Firebase
  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
});

// Need to specify the collection name and what data you want to push to the database
// In our case, it’s coffeeOrders
createCoffeeOrder(data) {
  return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection('coffeeOrders')
          .add(data)
          .then(res => {}, err => reject(err));
  });
}

// Display coffee orders data from firestore db coffeeOrders collection
// to use it, call it from orders-list.c.ts
getCoffeeOrders() {
  return this.firestore.collection('coffeeOrders').snapshotChanges();
}

// This function will connect and call your Firestore db based on selected collection and document id
// we can find the document id based on the parameters passed in from the component function call
// .set() will set the specific record with whatever data you passed in
// .set() takes in two parameters — your data and a settings object
// If you use merge: true, then it means that you only update the value-key pair passed in
// rather than replacing the entire document with what you passed in.

updateCoffeeOrder(data) {
  return this.firestore
             .collection('coffeeOrders')
             .doc(data.payload.doc.id)
             .set({ completed: true }, { merge: true });
}

// you need to know both the collection name and the document id to correctly identify which record you want to delete
deleteCoffeeOrder(data) {
  return this.firestore
      .collection('coffeeOrders')
      .doc(data.payload.doc.id)
      .delete();
}
}
