import { Component, inject, OnInit } from '@angular/core';

import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';

import { PopularProductComponent } from "./components/popular-product/popular-product.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [
    MainSliderComponent,
    PopularCategoriesComponent,
    PopularProductComponent,
    RouterLink
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
