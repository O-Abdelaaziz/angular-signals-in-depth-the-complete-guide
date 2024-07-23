import { inject } from '@angular/core';
import { LoadingService } from './../loading/loading.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.loadingOn();
  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
    })
  );
};
