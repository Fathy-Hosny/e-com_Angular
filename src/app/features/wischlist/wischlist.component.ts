

import { WischlistService } from './services/wischlist.service';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/service/cart.service';

import { Wischlist } from './models/wischlist.interface';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../shared/pipes/term-pipe';

@Component({
  selector: 'app-wischlist',
  standalone: true, 
  imports: [RouterLink, CurrencyPipe, TermPipe, CommonModule],
  templateUrl: './wischlist.component.html',
  styleUrl: './wischlist.component.css',
})
export class WischlistComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly wischlistService = inject(WischlistService);
  private readonly toastrService = inject(ToastrService);

  wischlisDetails: Wischlist = {} as Wischlist;

  ngOnInit(): void {
    this.getloggedUserWischlistData();
  }

  getloggedUserWischlistData(): void {

    this.wischlistService.getloggedUserWischlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wischlisDetails = res;
      },
      error: (err) => {
        console.error('Error fetching wishlist data:', err);
        // يمكنك هنا عرض رسالة خطأ للمستخدم
      },
    });
  }

  addProductsItemToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message);
        }
      },
    });
  }

  removeItemFromWishlist(id: string) {
    this.wischlistService.removSpacificWischlistItem(id).subscribe({
      next: (res) => {
        this.toastrService.success('Item removed from wishlist');
       
        this.getloggedUserWischlistData();
      },
    });
  }
}