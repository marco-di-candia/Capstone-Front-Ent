import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/service/checkout.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-component',
  templateUrl: './checkout-component.component.html',
  styleUrls: ['./checkout-component.component.css'],
})
export class CheckoutComponentComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      country: ['', Validators.required],
      cardHolderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      expiryDate: ['', [Validators.required, Validators.pattern('(0[1-9]|10|11|12)/[0-9]{4}')]],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.checkoutService.submitOrder(this.form.value).subscribe(
        (response) => {
          console.log('Order submitted successfully', response);
          this.successMessage = 'Order submitted successfully!';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/thank-you']);
          }, 3000);
        },
        (error: HttpErrorResponse) => {
          console.error('Error submitting order', error);
          this.errorMessage =
            'There was an error submitting your order. Please try again.';
          this.successMessage = '';
        }
      );
    } else {
      console.error('Invalid form. Please check all fields.');
      this.errorMessage = 'Invalid form. Please check all fields.';
      this.successMessage = '';
    }
  }
}
