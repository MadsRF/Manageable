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
  schedulesCollection: AngularFirestoreCollection<ScheduleInterface>; // This class creates a reference to a Firestore Collection.
  schedules: Observable<ScheduleInterface[]>; // A representation of any set of values over any amount of time
  scheduleDoc: AngularFirestoreDocument<ScheduleInterface>; // This class creates a reference to a Firestore Document.

  // when class is called executes the constructor and gets the list of schedules
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.schedulesCollection = this.afs.collection('schedules', ref => ref
      .where('UID', '==', this.authService.currentUserId)
      .orderBy('user', 'asc'));
  }

  // Gets the full list of messages where the user id matches and orders by date
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
  createSchedule(scheduleContent: ScheduleInterface) {
    scheduleContent.UID = this.authService.currentUserId;
    this.schedulesCollection.add(Object.assign({}, scheduleContent)).then();
  }

  updateSchedule(schedule: ScheduleInterface) {
    this.scheduleDoc = this.afs.doc(`schedules/${schedule.docRef}`);
    this.scheduleDoc.update(schedule).then();
  }

  deleteSchedule(schedule: ScheduleInterface) {
    this.scheduleDoc = this.afs.doc(`schedules/${schedule.docRef}`);
    this.scheduleDoc.delete().then();
  }

}
