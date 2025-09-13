import { Component, inject, Input, OnInit } from '@angular/core';

import { Products } from '../../../core/models/products.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WischlistService } from '../../../features/wischlist/services/wischlist.service';
import { CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../pipes/term-pipe';

@Component({
  selector: 'app-card',
  imports: [RouterLink,CurrencyPipe,TermPipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input({ required: true }) product: Products = {} as Products;
  private readonly cartService = inject(CartService);
  private readonly wischlistService = inject(WischlistService);
  private readonly toastrService = inject(ToastrService);

  isFavorite: boolean = false;
  ngOnInit(): void {
    this.checkwichlistHeart();
  }

  checkwichlistHeart(): void {
    this.wischlistService.getloggedUserWischlist().subscribe({
      next: (res) => {
     
      if (res.data.some((item: any) => item._id === this.product._id)) {
  this.isFavorite = true;
}

      }
    });
  }


  
toggleWishlist(id: string) {
  if (this.isFavorite) {
    
    this.wischlistService.removSpacificWischlistItem(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.isFavorite = false;
       this.toastrService.success(res.message);
        }
      }
    });
  } else {
    
    this.wischlistService.addProductToWischlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.isFavorite = true;
         this.toastrService.success(res.message);
        }
      }
    });
  }
}

  addProductsItemToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
       console.log(res);
     
       
 this.cartService.countNumber.next(res.numOfCartItems)
        if (res.status == 'success') {
          this.toastrService.success(res.message);
        }
      }
    });
  }
}
