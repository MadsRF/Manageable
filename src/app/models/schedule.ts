export class Schedule {
  constructor(public task: string,
              public user: string,
              public date: { year: number, month: number, day: number },
              public time: string) {
  }
}

export interface ScheduleInterface {
  task?: string;
  user?: string;
  date?: { year: number, month: number, day: number };
  time?: string;
  UID?: string;
  // not present in document but holds value
  docRef?: string;
}

