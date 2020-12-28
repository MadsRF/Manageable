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
  messagesCollection: AngularFirestoreCollection<MessageInterface>; // This class creates a reference to a Firestore Collection.
  messages: Observable<MessageInterface[]>; // A representation of any set of values over any amount of time.
  messageDoc: AngularFirestoreDocument<MessageInterface>; // This class creates a reference to a Firestore Document.

  // when class is called executes the constructor and gets the list of messages
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.messagesCollection = this.afs.collection('messages', ref => ref
      .where('UID', '==', this.authService.currentUserId).orderBy('date', 'desc'));

  }

  // Gets the full list of messages where the user id matches and orders by date
  getMessages(): Observable<MessageInterface[]> {
    return this.afs.collection('messages', (ref) => ref
      .where('UID', '==', this.authService.currentUserId).orderBy('date', 'desc'))
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

// creates a collection called messages if not created and adds new message doc.
  createMessage(messageContent: MessageInterface) {
    messageContent.UID = this.authService.currentUserId;
    this.messagesCollection.add(Object.assign({}, messageContent)).then();
  }

  // TODO: not implemented
  // updateMessage(message: MessageInterface) {
  //   this.messageDoc = this.afs.doc(`messages/${message.docRef}`);
  //   this.messageDoc.update(message);
  // }

  // deletes messages
  deleteMessage(message: MessageInterface) {
    this.messageDoc = this.afs.doc(`messages/${message.docRef}`);
    this.messageDoc.delete().then();
  }

}
