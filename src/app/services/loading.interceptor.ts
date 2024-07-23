import { inject } from '@angular/core';
import { LoadingService } from './../loading/loading.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { SkipLoading } from '../loading/skip-loading.component';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SkipLoading)) {
    return next(req);
  }
  
  const loadingService = inject(LoadingService);
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
    })
  );
};
