import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router, public fireService: AngularFirestore) {
    this.afAuth.authState.subscribe((auth => {
      this.authState = auth;
    }));
  }

  registerWithEmail(email: string, password: string) {
    console.log(email, password);
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.authState = data;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  createAdminUser(user: User) {
    console.log(user);
    return this.fireService.collection('users').add(user);
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/login']).then();
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

export interface User {
  firstname?: string;
  lastname?: string;
  company?: string;
  email?: string;
}
