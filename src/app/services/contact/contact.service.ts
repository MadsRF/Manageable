import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  api = 'https://mailthis.to/madsrunefrederiksen@gmail.com'; // used to interface to personal email

  constructor(private http: HttpClient) {
  }

  // Uses http to make a post response when user sends a message in the contact page
  PostContactMessage(input: any) {
    return this.http.post(this.api, input, {responseType: 'text'}).pipe(
      map(
        (response) => {
          if (response) {
            return response;
          }
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

}
