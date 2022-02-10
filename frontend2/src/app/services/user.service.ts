import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth: boolean = false;
  private SERVER_URL = environment.SERVER_URL;
  private user;
  authState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth);
  userData$: BehaviorSubject<boolean> = new BehaviorSubject<SocialUser>(this.auth);

  constructor(
    private http: HttpClient
  ) { }


  /* Get all users from the backend */
  getAllUsers() {
    return this.http.get(this.SERVER_URL + '/user');
  }

}
