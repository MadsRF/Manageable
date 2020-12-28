export class CompanyUser {
  constructor(public UID: string,
              public company: string,
              public email: string,
              public firstname: string,
              public lastname: string) {
  }
}

// interface of the admin company user
export interface CompanyUserInterface {
  // is required
  email: string;
  // is not required
  UID?: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  password?: string;
  // not present in document but holds value
  docRef?: string;
}
