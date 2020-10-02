import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from '../../shared/interfaces/category.interface';
import { BuyService } from '../../shared/services/buy.service';
import { Cons } from '../../shared/models/consultation.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Array<IProduct> = [];
  category: ICategory;
  categories: Array<ICategory> = [];
  dialog: boolean;
  name = '';
  phone = '';
  status = false;
  success: boolean;

  startLength = 4;
  numberReg: RegExp = /^\+\d{2}\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
  validNumber: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private firecloud: AngularFirestore,
    private buyService: BuyService,
    private firestore: AngularFirestore
  ) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        this.getProducts(categoryName);
        this.getCategory(categoryName);
      }
    });
  }

  ngOnInit(): void {
  }

  private getProducts(categoryName: string): void {
    this.products = [];
    this.firecloud.collection('products').ref.where('category.nameEN', '==', categoryName)
      .onSnapshot(
        collection => {
          collection.forEach(document => {
            const data = document.data() as IProduct;
            const id = document.id;
            this.products.push({ id, ...data });
          });
        }
      );
  }

  private getCategory(categoryName: string): void {
    this.firecloud.collection('categories').ref.where('nameEN', '==', categoryName)
      .onSnapshot(
        collection => {
          collection.forEach(document => {
            this.categories[0] = document.data() as ICategory;
            this.category = document.data() as ICategory;
          });
        }
      );
  }

  buy(product: IProduct): void {
    this.dialog = true;
    this.buyService.product = product;
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
