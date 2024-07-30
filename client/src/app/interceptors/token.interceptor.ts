import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.userAccessToken) return next(req);

  const cloned = req.clone({
    headers: req.headers.set(
      'Authorization',
      'Bearer ' + authService.userAccessToken
    ),
  });

  return next(cloned).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(err);
    })
  );
};
