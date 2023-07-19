import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

import { User } from './user.model';
import { AuthModel } from './auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api_key : string = 'AIzaSyBBL4FMgDo53DlzTqr1giOYdvPzylJZJg4';
  private setTimeLogout: any;
  user = new BehaviorSubject<User | null>(null);

  constructor(private _httpClient: HttpClient, private _router: Router) {}

  signUp(email: string, password: string): Observable<AuthModel> {
    return this._httpClient
      .post<AuthModel>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.api_key,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((response) => {
          this.handelSaveUserDate(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string): Observable<AuthModel> {
    return this._httpClient
      .post<AuthModel>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.api_key,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((response) => {
          this.handelSaveUserDate(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const getUserData: any = localStorage.getItem('userData');
    let userData: any = JSON.parse(getUserData);
    if (!getUserData) {
      return;
    }
    const currentUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (currentUser.token) {
      this.user.next(currentUser);

      const expirationDuration: number =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this._router.navigate(['./auth']);
    if (this.setTimeLogout) {
      clearTimeout(this.setTimeLogout);
    }
    this.setTimeLogout = null;
  }

  autoLogout(expirationDuration: number) {
    this.setTimeLogout = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handelSaveUserDate(
    email: string,
    userId: string,
    idToken: string,
    dateExpire: number
  ) {
    const expireDate: Date = new Date(new Date().getTime() + dateExpire * 1000);
    console.log('Expire Date Is ' + expireDate);
    let user = new User(email, userId, idToken, expireDate);
    this.user.next(user);
    this.autoLogout(dateExpire * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
