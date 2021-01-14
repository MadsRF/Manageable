import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {CompanyUserInterface} from '../../models/companyuser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null; // Used to hold the users data

  // calls the AngularFireAuth to get info about user credentials
  constructor(private afAuth: AngularFireAuth, private router: Router, public fireService: AngularFirestore) {
    this.afAuth.authState.subscribe((auth => {
      this.authState = auth;
    }));
  }

  // is called when company register. creates firebase auth login with email and password
  // this also creates a document with the information from the registration in the collection companies
  registerWithEmail(email: string, password: string, companyUser: CompanyUserInterface) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((data) => {
      this.authState = data;
      // Gets user id and added to company for unique id
      companyUser.UID = data.user.uid;
      return this.fireService.collection('companies').add(Object.assign({}, companyUser));
    }).catch(error => {
      console.log(error);
      throw error;
    });
  }

  // is called in login and checks if login info is correct in firebase
  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((data) => {
      this.authState = data;
    })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  // TODO: is bugged. if time look into. (has to refresh page on logout to be able to move)
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // all firebase getter functions
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState.email;
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    return (this.authState !== null) && (!this.isUserAnonymousLoggedIn);
  }
}

