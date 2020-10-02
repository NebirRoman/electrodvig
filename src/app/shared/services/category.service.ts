import { Injectable } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getFirecloudCategory(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('categories').snapshotChanges();
  }

  postFirecloudCategory(category: ICategory): Promise<DocumentReference> {
    return this.firestore.collection('categories').add(category)
  }
}
