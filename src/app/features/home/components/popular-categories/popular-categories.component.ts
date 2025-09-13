import { Component, inject, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Categories } from '../../../../core/models/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  CategoriesList: Categories[] = [];

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
     
    autoplayTimeout:3000,
autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
        1100: {
        items: 5
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this.getAllCategoriesData();
  }
  getAllCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {

        this.CategoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
