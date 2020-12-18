import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {MessageInterface} from '../../models/message';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  messagesCollection: AngularFirestoreCollection<MessageInterface>;
  messages: Observable<MessageInterface[]>;
  messageDoc: AngularFirestoreDocument<MessageInterface>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.messagesCollection = this.afs.collection('messages', ref => ref
      .where('UID', '==', this.authService.currentUserId));
  }

  getMessages(): Observable<MessageInterface[]> {
    return this.afs.collection('messages', (ref) => ref
      .where('UID', '==', this.authService.currentUserId))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((a) => {
            const data = a.payload.doc.data() as MessageInterface;
            data.docRef = a.payload.doc.id;
            return data;
          })
        )
      );
  }

// creates a collection called schedules if not created and adds new schedule doc.
  createMessage(messageContent: MessageInterface) {
    messageContent.UID = this.authService.currentUserId;
    this.messagesCollection.add(Object.assign({}, messageContent)).then();
  }

  updateMessage(schedule: MessageInterface) {
    this.messageDoc = this.afs.doc(`messages/${schedule.docRef}`);
    this.messageDoc.update(schedule);
  }

  deleteMessage(schedule: MessageInterface) {
    this.messageDoc = this.afs.doc(`messages/${schedule.docRef}`);
    this.messageDoc.delete();
  }

}
