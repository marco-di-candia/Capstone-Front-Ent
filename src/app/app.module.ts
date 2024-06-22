import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { ShopComponent } from './components/shop/shop.component';
import { CheckoutComponentComponent } from './components/checkout-component/checkout-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutSuccessModalComponent } from './components/checkout-success-modal/checkout-success-modal.component';


const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ShopPageComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponentComponent },
  { path: 'confirmation', component: CheckoutSuccessModalComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ShopPageComponent,
    ShopComponent,
    CheckoutComponentComponent,
    CheckoutSuccessModalComponent,

  ],
  imports: [
    BrowserModule, // Make sure BrowserModule is imported here
    ReactiveFormsModule, // Import ReactiveFormsModule for Reactive Forms
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
