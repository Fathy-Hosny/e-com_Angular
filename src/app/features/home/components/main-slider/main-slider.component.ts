import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperOptions } from 'swiper/types';



@Component({
  selector: 'app-main-slider',
  imports: [],
  templateUrl: './main-slider.component.html',
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent  {
 swiperConfig: SwiperOptions = {
  
    
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      
    },


}
}
