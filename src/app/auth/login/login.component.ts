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
        this.errorMessage = 'Invalid email or password'; 
        return throwError(error);
      })
    ).subscribe(response => {
     
      this.router.navigate(['/']);
    });
  }
}
