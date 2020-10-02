import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrder } from '../../shared/interfaces/order.interface';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Array<IOrder>;
  order: IOrder;
  dialog: boolean;
  filter = '';

  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getFirebaseOrders();
  }

  getFirebaseOrders(): void {
    this.firestore.collection('orders').snapshotChanges().subscribe(
      collection => {
        this.orders = collection.map(order => {
          const data = order.payload.doc.data() as IOrder;
          const id = order.payload.doc.id;
          return { id, ...data };
        })
        this.date();
      }
    );
  }

  date():void {
    this.orders.forEach(order => {
      order.date = new Date({ ...order.date}.seconds * 1000)
    });
    this.orders.sort((a, b) => b.date - a.date);
  }

  details(order: IOrder): void {
    this.dialog = true;
    this.order = order;
  }

  closeModal(): void {
    this.dialog = false;
    this.getFirebaseOrders();
  }

  updateOrder(): void {
    this.firestore.collection('orders').doc(this.order.id.toString()).update({ ...this.order })
        .then(() => {
          this.dialog = false;
        })
        .catch(err => console.log(err));
  }
}
