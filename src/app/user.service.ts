import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { User } from './user';


@Injectable()
export class UserService {

  private apiUrl = "http://localhost:8000/api/v1";

  constructor(private http: Http) { }

  getOauthUrl() {
    return this.apiUrl + "/oauth/token";
  }

  getUsersUrl() {
    return this.apiUrl + "/users";
  }

  //TODO:: Improve this Temporary solution
  getAccessToken() {
    var headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    let postData = {
      grant_type: "password",
      client_id: 1,
      client_secret: "someClientSecret",
      username: "admin@example.com",
      password: "somePassword"
    }

    return this.http.post(this.getOauthUrl(), JSON.stringify(postData), {
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUsers(accessToken: string): Observable<User[]> {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + accessToken,
    });

    return this.http.get(this.getUsersUrl(), {
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
