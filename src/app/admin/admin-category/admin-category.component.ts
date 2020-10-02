import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../../shared/models/category.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  dialog: boolean;
  dialogDel: boolean;
  nameUA = '';
  nameEN = '';
  adminCategory: Array<ICategory> = [];
  categoryID = 1;
  deleteID: number;

  catImageStatus: boolean;
  catImage = '';
  promoImageStatus: boolean;
  promoImage = '';
  filter = '';

  constructor(private catService: CategoryService,
              private firestore: AngularFirestore,
              private afStorage: AngularFireStorage,) { }

  ngOnInit(): void {
    this.getFirebaseCategories();
  }

  closeModal(): void {
    this.nameEN = '';
    this.nameUA = '';
    this.dialog = false;
    this.dialogDel = false;
    this.catImageStatus = false;
    this.promoImageStatus = false;
    this.catImage = '';
    this.promoImage = '';
  }

  getFirebaseCategories(): void {
    this.catService.getFirecloudCategory().subscribe(
      collection => {
        this.adminCategory = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        })
      }
    );
  }

  addCategory(): void {
    const newC = new Category(this.categoryID, this.nameEN, this.nameUA, this.catImage, this.promoImage);
    delete newC.id;
    this.catService.postFirecloudCategory(Object.assign({}, newC))
    this.closeModal();
  }

  deleteModal(category: ICategory): void {
    this.deleteID = category.id;
    this.dialogDel = true;
  }

  deleteCategory(): void {
    this.firestore.collection('categories').doc('' + this.deleteID).delete();
    this.dialogDel = false;
  }

  uploadFile(event, bool: boolean): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        if(bool){
          this.catImage = url;
          this.catImageStatus = true;
        }
        else{
          this.promoImage = url;
          this.promoImageStatus = true;
        }
      })
    })
  }

  deleteImg(bool: boolean): void {
    if(bool) {
      this.catImageStatus = false;
      this.catImage = '';
    }
    else{
      this.promoImageStatus = false;
      this.promoImage = '';
    }
  }

}
