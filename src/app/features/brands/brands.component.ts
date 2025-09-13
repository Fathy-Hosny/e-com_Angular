import { Component, HostListener, inject } from '@angular/core';
import { BrandsService } from '../../core/services/Brands/brands.service';
import { Brands } from '../../core/models/brands.interface';

import {NgxPaginationModule} from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule,CommonModule], 
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
private readonly BrandsService = inject(BrandsService);
pageSize!:number;
p!:number;
total!:number;

  BrandsList: Brands[] = [];


  ngOnInit(): void {
    this.getAllBrandsData();
  }

  getAllBrandsData(pagNumber:number=1): void {
    this.BrandsService.getAllBrands(pagNumber).subscribe({
      next: (res) => {
        
        
        this.BrandsList = res.data;

        this.pageSize=res.metadata.limit;

        this.p=res.metadata.currentPage;

        
        this.total=res.results;
       


      }
    });
  }


 selectedBrand: Brands | null = null;
  animateClose:boolean = false;






  @HostListener('document:keydown', ['$event'])
handleKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && !this.animateClose) {
    this.closeBrandDetails();  
  }
}


  openBrandDetails(brand: Brands) {
    this.selectedBrand = brand;
    this.animateClose = false;
  }

  closeBrandDetails() {
    this.animateClose = true;
    setTimeout(() => {
      this.selectedBrand = null;
    }, 300); 
  }

}
