import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

// import {Router} from '@angular/router';
// import {auth} from 'firebase/app';
// import {AngularFireAuth} from '@angular/fire/auth';
// import {Angularfirestore, AngularFirestoreModule} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

// TODO: get data from database when ready also do interface/models in model folder
export class ServiceService {

  constructor(public fireService: AngularFirestore) {






  }
}
