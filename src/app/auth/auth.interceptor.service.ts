import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _httpClient: HttpClient
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(!user);
        
        if (!user) {
          return next.handle(req);
        }
        let token;
        token = user?.token;
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', token ? token : false),
        });
        console.log(modifiedReq);
        return next.handle(modifiedReq);
      })
    );
  }
}
