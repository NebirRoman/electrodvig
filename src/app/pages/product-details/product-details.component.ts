import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { BuyService } from '../../shared/services/buy.service';
import { Cons } from 'src/app/shared/models/consultation.model';
import { Slider } from 'ngx-slider';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  description: Array<string>;
  delSet: Array<string>;
  dialog: boolean;
  
  name = '';
  phone = '';
  status = false;
  success: boolean;

  startLength = 4;
  numberReg: RegExp = /^\+\d{2}\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
  validNumber: boolean;

  public slider = new Slider();

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private firecloud: AngularFirestore,
    private buyService: BuyService,
    private firestore: AngularFirestore
  ) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const id = this.actRoute.snapshot.paramMap.get('id');
        this.getProduct(id);
      }
    });
    this.slider.config.loop = true;
    this.slider.config.showPreview = false;
    this.slider.config.showTitle = false;
  }

  ngOnInit(): void {
  }

  private getProduct(id: string): void {
    this.firecloud.collection('products').ref.where('__name__', '==', id)
      .onSnapshot(
        collection => {
          collection.forEach(document => {
            this.product = document.data() as IProduct;
            this.description = this.product.description.split(';')
            this.delSet = this.product.set.split(';')
            this.slider.items = this.product.images.map(elem => {return {src: elem}});
          });
        }
      );
  }

  buy(): void {
    this.dialog = true;
    this.buyService.product = this.product;
  }

  close(): void{
    this.dialog = false;
  }

  consultation(): void {
    const cons = new Cons(1,
      this.name,
      this.phone,
      this.status,
      new Date)
    delete cons.id;
    this.firestore.collection('consultations').add({ ...cons }).
      then(() => {
        this.success = true;
        this.phone = '';
        this.name = '';
        this.status = false;
      }).
      catch(err => console.log(err));
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
