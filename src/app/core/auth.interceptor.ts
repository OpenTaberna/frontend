import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  if (!request.url.startsWith('/api/')) return next(request);
  return from(auth.token()).pipe(switchMap(token => next(token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request)));
};
