import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';
import {CompanyUserInterface} from '../../models/companyuser';

@Injectable({
  providedIn: 'root'
})
export class CompanyuserService {
  companyUserDoc: AngularFirestoreDocument<CompanyUserInterface>; // This class creates a reference to a Firestore Document

  constructor(private afs: AngularFirestore, private authService: AuthService) {
  }

  // Gets the specific company user from companies where the auth UID matches with the one that logged in
  getCompanyUser(): Observable<CompanyUserInterface[]> {
    return this.afs.collection('companies', (ref) => ref
      .where('UID', '==', this.authService.currentUserId))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((a) => {
            const data = a.payload.doc.data() as CompanyUserInterface;
            data.docRef = a.payload.doc.id;
            return data;
          })
        )
      );
  }

  // updates user info (not email or password)
  updateCompanyUser(companyUser: CompanyUserInterface) {
    this.companyUserDoc = this.afs.doc(`companies/${companyUser.docRef}`);
    this.companyUserDoc.update(companyUser).then();
  }

}
