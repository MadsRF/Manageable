import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';
import {UserInterface} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<UserInterface>; // This class creates a reference to a Firestore Collection.
  users: Observable<UserInterface[]>; // A representation of any set of values over any amount of time
  userDoc: AngularFirestoreDocument<UserInterface>; // This class creates a reference to a Firestore Document.

  // when class is called executes the constructor and gets the list of schedules
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.usersCollection = this.afs.collection('users', ref => ref
      .where('UID', '==', this.authService.currentUserId)
      .orderBy('occupation', 'asc'));
  }

  // Gets the full list of messages where the user id matches and orders by date
  getUsers(): Observable<UserInterface[]> {
    return this.afs.collection('users', (ref) => ref
      .where('UID', '==', this.authService.currentUserId)
      .orderBy('occupation', 'asc'))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((a) => {
            const data = a.payload.doc.data() as UserInterface;
            data.docRef = a.payload.doc.id;
            return data;
          })
        )
      );
  }

// creates a collection called schedules if not created and adds new schedule doc.
  createUser(userContent: UserInterface) {
    userContent.UID = this.authService.currentUserId;
    this.usersCollection.add(Object.assign({}, userContent)).then();
  }

  updateUser(userContent: UserInterface) {
    this.userDoc = this.afs.doc(`users/${userContent.docRef}`);
    this.userDoc.update(userContent).then();
  }

  deleteUser(userContent: UserInterface) {
    this.userDoc = this.afs.doc(`users/${userContent.docRef}`);
    this.userDoc.delete().then();
  }

}
