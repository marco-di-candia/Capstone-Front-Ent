// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthData } from '../interfaces/auth-data';
import { Router } from '@angular/router';
import { SignUp } from '../interfaces/sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = "http://localhost:8080/auth/";
  jwtHelper = new JwtHelperService();
  private authSub = new BehaviorSubject<AuthData | null>(null);
  user$ = this.authSub.asObservable();
  timeout: any;

  constructor(private http: HttpClient, private router: Router) {
    this.restore(); // Restore authentication on service load
  }

  signup(data: SignUp) {
    return this.http.post(`${this.apiURL}signup`, data, { responseType: 'text' });
  }

  login(data: { email: string, password: string }) {
    return this.http.post<AuthData>(`${this.apiURL}login`, data).pipe(
      tap((data) => {
        console.log('auth data: ', data);
        this.authSub.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.autologout(data);
        this.router.navigate(['/']); // Navigate to home page after login
      }),
      catchError(this.errors)
    );
  }

  private errors(err: any) {
    console.log(err.error);
    switch (err.error) {
      case 'Email already exists':
        return throwError('User already exists');
      case 'Incorrect password':
        return throwError('Incorrect password');
      case 'Cannot find user':
        return throwError('User not found');
      default:
        return throwError('General error');
    }
  }

  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  restore() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      console.log('No user in localStorage');
      return;
    } else {
      const user: AuthData = JSON.parse(userJson);
      console.log('User restored from localStorage:', user);
      if (!this.jwtHelper.isTokenExpired(user.token)) {
        this.authSub.next(user);
        this.autologout(user);
      } else {
        console.log('Token is expired');
        this.logout();
      }
    }
  }

  autologout(user: AuthData) {
    const dateExpiration = this.jwtHelper.getTokenExpirationDate(user.token) as Date;
    const millisecondsExp = dateExpiration.getTime() - new Date().getTime();
    console.log('Token expiration time in milliseconds:', millisecondsExp);
    if (millisecondsExp > 0) {
      this.timeout = setTimeout(() => {
        this.logout();
      }, millisecondsExp);
    } else {
      console.log('Token has already expired');
      this.logout();
    }
  }
}
