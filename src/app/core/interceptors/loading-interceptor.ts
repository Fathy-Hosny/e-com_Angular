import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

let activeRequests = 0; 

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService);


  if (activeRequests === 0) {
    ngxSpinnerService.show();
  }
  activeRequests++; 

  return next(req).pipe(
    finalize(() => {
      activeRequests--;


      if (activeRequests === 0) {
        ngxSpinnerService.hide();
      }
    })
  );
};