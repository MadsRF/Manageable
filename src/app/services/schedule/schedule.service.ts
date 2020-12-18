import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ScheduleInterface} from '../../models/schedule';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedulesCollection: AngularFirestoreCollection<ScheduleInterface>;
  schedules: Observable<ScheduleInterface[]>;
  scheduleDoc: AngularFirestoreDocument<ScheduleInterface>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.schedulesCollection = this.afs.collection('schedules', ref => ref
      .where('UID', '==', this.authService.currentUserId)
      .orderBy('user', 'asc'));
  }

  getSchedules(): Observable<ScheduleInterface[]> {
    return this.afs.collection('schedules', (ref) => ref
      .where('UID', '==', this.authService.currentUserId)
      .orderBy('user', 'asc'))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((a) => {
            const data = a.payload.doc.data() as ScheduleInterface;
            data.docRef = a.payload.doc.id;
            return data;
          })
        )
      );
  }

// creates a collection called schedules if not created and adds new schedule doc.
  createSchedule(schedulecontent: ScheduleInterface) {
    schedulecontent.UID = this.authService.currentUserId;
    this.schedulesCollection.add(Object.assign({}, schedulecontent)).then();
  }

  updateSchedule(schedule: ScheduleInterface) {
    this.scheduleDoc = this.afs.doc(`schedules/${schedule.docRef}`);
    this.scheduleDoc.update(schedule);
  }

  deleteSchedule(schedule: ScheduleInterface) {
    this.scheduleDoc = this.afs.doc(`schedules/${schedule.docRef}`);
    this.scheduleDoc.delete();
  }

}

// TODO: old code for constructor
// console.log('scheduleService called1');
// this.schedulesCollection = this.afs.collection('schedules', ref => ref
//   .where('UID', '==', this.authService.currentUserId)
//   .orderBy('user', 'asc'));
// console.log('scheduleService called2');
// this.schedules = this.schedulesCollection.snapshotChanges()
//   .pipe(map(changes => {
//     console.log('scheduleService called3');
//     return changes.map(a => {
//       // doesn't get called when page gets refreshed
//       console.log('scheduleService called4');
//       const data = a.payload.doc.data() as ScheduleInterface;
//       data.docRef = a.payload.doc.id;
//       return data;
//     });
//   }));

// TODO: Creates a subcollection called schedules in the companies collection. Uses the UID (user id) as an unique identifier
// this.afs.collection<any>('companies').snapshotChanges().pipe(map(actions => {
//   return actions.map(a => {
//     const data = a.payload.doc.data();
//     const id = a.payload.doc.id;
//     if (data.UID === this.authService.currentUserId) {
//       console.log('id', id, 'data', data);
//
//       schedulecontent.UID = this.authService.currentUserId;
//       // console.log(id);
//       this.afs.collection('companies').doc(id).collection('schedules').add(schedulecontent).then();
//     }
//   });
// })).subscribe();

// TODO: finds one company in collection companies
// const res = this.fireService.collection('companies', ref => ref.where('UID', '==', this.authService.currentUserId)).valueChanges()
// .subscribe(data => {
//   console.log('data', data[0]);
//   return data;
