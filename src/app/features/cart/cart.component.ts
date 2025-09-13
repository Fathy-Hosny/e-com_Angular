import { Cart } from './models/cart.interface';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from './service/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../shared/pipes/term-pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule, CurrencyPipe, TermPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  cartDetails: Cart = {} as Cart;

  ngOnInit(): void {
    this.getloggedUserCartData();
  }

  getloggedUserCartData(): void {
    this.cartService.getloggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
    });
  }

  removCartItem(id: string): void {
    this.cartService.removSpacificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.countNumber.next(res.numOfCartItems);

        this.cartDetails = res.data;
        this.toastrService.success('You remove Item successful');
      },
    });
  }
  removAllCartItemData(): void {
    this.cartService.removAllCartItem().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.cartService.countNumber.next(res.numOfCartItems);

        this.toastrService.success('You  Clear Cart successful');
      },
    });
  }

  UpdatCountCart(id: string, count: number): void {
    this.cartService.updateCount(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.toastrService.success('You Add Item successful');
      },
    });
  }
}
