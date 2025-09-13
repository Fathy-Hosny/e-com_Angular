import { ProductDetailsService } from './service/product-details.service';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../core/models/products.interface';
import { CommonModule } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-details',

  imports: [ CommonModule], 
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);

   private readonly cartService= inject(CartService)
   private readonly toastrService=inject(ToastrService)

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetailsData();
  }





  
  id: string | null = null;
  productDetails: Products = {} as Products;
  
  flag: boolean = true;
  animateClose: boolean = false;
  modelImg: string = '';

  hideModel(): void {
      this.animateClose = true;
      setTimeout(() => {
    this.flag = true;

      this.modelImg = '';
    }, 300);
  }

 
 
  showModel(imageUrl: string): void {
    this.modelImg = imageUrl;
    this.flag = false;
      this.animateClose = false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this.flag) {
      this.hideModel();
    }
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParms) => {
        this.id = urlParms.get('id');
      },
    });
  }

  getProductDetailsData(): void {
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
    });
  }




   addProductsItemToCart(id:string){
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res)

      if(res.status=="success"){
  this.toastrService.success(res.message)
      }
    },error:(err)=>{
      console.log(err)
 
    }
  })
 }
}