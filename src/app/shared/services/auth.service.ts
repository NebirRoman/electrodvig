import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private router: Router
  ) { }

  signIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afFirestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              localStorage.setItem('user', JSON.stringify(userRef.data()));
              if (userRef.data().access) {
                this.router.navigateByUrl('admin');
                // this.userStatusChange.next('admin');
              }
              // else if (userRef.data().role === 'user') {
              //   this.router.navigateByUrl('profile');
              //   this.userStatusChange.next('user');
              // }
            })
          }
        )
      })
      .catch(err => console.log(err));
  }

  signOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('main');
        // this.userStatusChange.next('logout')
      })
      .catch(err => console.log(err));
  }
}
