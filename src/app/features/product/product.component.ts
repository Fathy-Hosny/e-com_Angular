import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../../core/models/products.interface';
import { ProductsService } from '../../core/services/Products/products.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  text: string = '';
  pageSize!: number;
  p!: number;
  total!: number;
  productList: Products[] = [];

  ngOnInit(): void {
    this.getAllproducrsData();
  }

  getAllproducrsData(pagNumber: number = 1): void {
    this.productsService.getAllproducts(pagNumber).subscribe({
      next: (res) => {
        this.productList = res.data;

        this.pageSize = res.metadata.limit;

        this.p = res.metadata.currentPage;

        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
