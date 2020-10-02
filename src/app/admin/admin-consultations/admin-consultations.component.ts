import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICons } from '../../shared/interfaces/consultation.interface';

@Component({
  selector: 'app-admin-consultations',
  templateUrl: './admin-consultations.component.html',
  styleUrls: ['./admin-consultations.component.scss']
})
export class AdminConsultationsComponent implements OnInit {
  cons: Array<ICons>;
  // order: IOrder;
  // dialog: boolean;
  filter = '';

  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getFirebaseCons();
  }

  getFirebaseCons(): void {
    this.firestore.collection('consultations').snapshotChanges().subscribe(
      collection => {
        this.cons = collection.map(order => {
          const data = order.payload.doc.data() as ICons;
          const id = order.payload.doc.id;
          return { id, ...data };
        })
        this.date();
      }
    );
  }

  date():void {
    this.cons.forEach(con => {
      con.date = new Date({ ...con.date}.seconds * 1000)
    });
    this.cons.sort((a, b) => b.date - a.date);
  }

  changeStatus(con: ICons): void{
    con.status = !con.status
    this.firestore.collection('consultations').doc(con.id.toString()).update({ ...con })
        .then(() => {
        })
        .catch(err => console.log(err));
  }

}
