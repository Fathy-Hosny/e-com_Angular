import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Products } from '../../../../core/models/products.interface';
import { ProductsService } from '../../../../core/services/Products/products.service';


@Component({
  selector: 'app-popular-product',
  imports: [ 
    CardComponent,],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css'
})
export class PopularProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  productList: Products[] = [];

  ngOnInit(): void {
    this.getAllproducrsData();
  }

  getAllproducrsData(): void {
    this.productsService.getAllproducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
