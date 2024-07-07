import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  errorMessage: string = '';

  constructor(private authSrv: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authSrv.signup(form.value).subscribe(
      (response) => {
        alert('Registrazione effettuata con successo!');
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Errore durante la registrazione:', error);
        if (error.error && error.error.messaggio) {
          this.errorMessage = error.error.messaggio;
        } else {
          this.errorMessage = 'Si è verificato un errore durante la registrazione.';
        }
      }
    );
  }
}
