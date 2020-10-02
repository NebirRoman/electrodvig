import { Component, OnInit } from '@angular/core';
import { BuyService } from '../shared/services/buy.service';
import { Order } from '../shared/models/order.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  phone = '';
  name = '';
  delivery = 'Нова пошта';
  success: boolean;
  startLength = 4;
  numberReg: RegExp = /^\+\d{2}\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
  validNumber: boolean;
  constructor(private buyService: BuyService,
    private firestore: AngularFirestore,
    private router: Router) { }

  ngOnInit(): void {
  }

  setDelivery(del: string): void {
    this.delivery = del;
  }

  addOrder(): void {
    const ord = new Order(1,
      this.name,
      this.phone,
      this.buyService.product,
      this.delivery,
      new Date,
      '',
      'нове',
      '')
    delete ord.id;
    this.firestore.collection('orders').add({ ...ord }).
      then(() => {
        this.success = true;
        this.phone = '';
        this.name = '';
      }
      ).
      catch(err => console.log(err));
  }

  toMain(): void {
    this.router.navigateByUrl('main');
  }

  focus(): void {
    if (!this.phone) this.phone = '+38(';
  }

  number(): void {
    if (this.phone.length > this.startLength) {
      if (this.phone.length == 3) this.phone += '(';
      if (this.phone.length == 7) this.phone += ')-';
      if (this.phone.length == 12) this.phone += '-';
      if (this.phone.length == 15) this.phone += '-';
    };
    this.startLength = this.phone.length;
    if (this.numberReg.test(this.phone)) {
      this.validNumber = true;
    }
    else this.validNumber = false;
  }
}
