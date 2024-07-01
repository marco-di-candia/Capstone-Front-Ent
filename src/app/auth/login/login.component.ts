// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = '';

  constructor(private authSrv: AuthService, private router: Router) { }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authSrv.login(form.value).pipe(
      catchError(error => {
        this.errorMessage = error; // Display error message
        return throwError(error);
      })
    ).subscribe(response => {
      // Redirect to home page on successful login
      this.router.navigate(['/']);
    });
  }
}
