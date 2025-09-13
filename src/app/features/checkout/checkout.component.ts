import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { Cart } from '../cart/models/cart.interface';
import { CartService } from '../cart/service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);

  checkOutForm!: FormGroup;

  id: string | null = null;
  ngOnInit(): void {
    this.iniyfrom();

    this.getcardId();
    this.getloggedUserCartData();
  }

  cartDetails: Cart = {} as Cart;

  getloggedUserCartData(): void {
    this.cartService.getloggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);

        this.cartDetails = res.data;
      },
    });
  }

  getcardId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
        console.log(this.id);
      },
    });
  }

  iniyfrom(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
  }

  submitForm(): void {
    if (this.checkOutForm.valid) {
      this.cartService
        .checkOutSession(this.id, this.checkOutForm.value)
        .subscribe({
          next: (res) => {
            if (res.status == 'success') {
              window.open(res.session.url, '_self');
            }
          },
        });
    } else {
      this.checkOutForm.markAllAsTouched();
    }
  }

  submitFormCach(): void {
    if (this.checkOutForm.valid) {
      this.cartService.CashOrder(this.id, this.checkOutForm.value).subscribe({
        next: (res) => {
          if (res.status == 'success') {
            this.toastrService.success(
              'Your cash order was placed successfully.'
            );

            setTimeout(() => {
              this.router.navigate(['/allorders']);
            }, 500);
          }
        },
      });
    } else {
      this.checkOutForm.markAllAsTouched();
    }
  }
}
