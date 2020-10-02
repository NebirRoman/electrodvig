import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { IProduct } from '../../shared/interfaces/product.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  dialog: boolean;
  dialogDel: boolean;

  adminProduct: Array<IProduct> = [];
  categories: Array<ICategory> = [];
  productCategory: ICategory;
  categoryName: string;
  name = '';
  description = '';
  set = '';
  price: number;
  productImages: Array<string> = [];

  productID = 1;
  deleteID: number;
  imageStatus: boolean;
  editStatus: boolean;
  filter = '';

  constructor(private catService: CategoryService,
    private prodService: ProductService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage,) { }

  ngOnInit(): void {
    this.getFirebaseCategories();
    this.getFirebaseProducts();
  }

  getFirebaseCategories(): void {
    this.catService.getFirecloudCategory().subscribe(
      collection => {
        this.categories = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        })
      }
    );
  }

  getFirebaseProducts(): void {
    this.prodService.getFirecloudProduct().subscribe(
      collection => {
        this.adminProduct = collection.map(category => {
          const data = category.payload.doc.data() as IProduct;
          const id = category.payload.doc.id;
          return { id, ...data };
        })
      }
    );
  }

  setCategory(): void {
    this.productCategory = this.categories.filter(cat => cat.nameEN === this.categoryName)[0];
  }

  uploadFile(event): void {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const type = file.type.slice(file.type.indexOf('/') + 1);
      const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
      const filePath = `images/${name}.${type}`;
      const task = this.afStorage.upload(filePath, file);
      task.then(image => {
        this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
          this.productImages.push(url);
          this.imageStatus = true;
        })
      })
    }
  }

  deleteImg(img: string): void {
    this.productImages.splice(this.productImages.findIndex(val => val === img), 1);
    if(!this.productImages.length){
      this.imageStatus = false;
    }
  }

  addProduct(): void {
    const product: IProduct = new Product(this.productID,
      this.productCategory,
      this.name,
      this.description,
      this.set,
      this.price,
      this.productImages);

    if (!this.editStatus) {
      delete product.id;
      this.prodService.postFirecloudProduct({ ...product })
        .catch(err => console.log(err));
    }
    else {
      this.prodService.updateFirecloudProduct({ ...product })
        .catch(err => console.log(err));
    }
    this.closeModal();
  }

  editProduct(product: IProduct): void {
    this.productID = product.id;
    this.categoryName = product.category.nameEN;
    this.setCategory();
    this.name = product.name;
    this.description = product.description;
    this.set = product.set;
    this.price = product.price;
    this.editStatus = true;
    this.imageStatus = true;
    this.productImages = product.images;
    this.dialog = true;
  }

  closeModal(): void {
    this.name = '';
    this.categoryName = '';
    this.description = '';
    this.set = '';
    this.price = null;
    this.productImages = [];
    this.imageStatus = false;
    this.editStatus = false;
    this.dialog = false;
    this.dialogDel = false;
  }

  deleteModal(product: IProduct): void {
    this.deleteID = product.id;
    this.dialogDel = true;
  }

  deleteProduct(): void {
    this.firestore.collection('products').doc('' + this.deleteID).delete();
    this.closeModal();
  }
}
