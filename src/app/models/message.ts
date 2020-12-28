export class Message {
  constructor(public title: string,
              public message: string,
              public user: string,
              public date: { year: number; month: number; day: number },
              public time: string) {
  }
}

export interface MessageInterface {
  title?: string;
  message?: string;
  user?: string;
  date?: { year: number, month: number, day: number };
  time?: string;
  UID?: string;
  // not present in document but holds value
  docRef?: string;
}
