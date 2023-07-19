import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthModel } from './auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMsg = null;

  constructor(private _authService: AuthService, private _router : Router) {}

  onToggleLogMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObservable : Observable<AuthModel>;
    if (!authForm.valid) {
      return;
    }
    this.errorMsg = null;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this._authService.signIn(email, password);
    } else {
      authObservable = this._authService.signUp(email, password);
    }
    authObservable.subscribe({
      next: (response) => {
        this.isLoading = false;
        this._router.navigate(['./recipes'])
      },
      error: errorMsg => {
        this.errorMsg = errorMsg.error.error.message;
        this.isLoading = false;
      },
    });
    authForm.resetForm();
  }
}
