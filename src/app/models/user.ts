export class User {
  constructor(public UID: string,
              public occupation: string,
              public firstname: string,
              public lastname: string,
              public email: string,
              public phone: string) {
  }
}

// interface of the admin company user
export interface UserInterface {
  // is not required
  UID?: string;
  occupation?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  // not present in document but holds value
  docRef?: string;
}
