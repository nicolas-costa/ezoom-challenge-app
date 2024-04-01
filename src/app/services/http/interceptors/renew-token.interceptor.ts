import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {AuthService, AuthResponse} from '../../auth/auth.service';
import {TokenService} from "../../auth/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly maxRetryCount = 2;
  private retryCount = 0;

  constructor(private authService: AuthService, private readonly router: Router, private readonly tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !error.url?.includes('login')) {
          if (this.retryCount < this.maxRetryCount) {
            this.retryCount++;
            return this.authService.renewToken().pipe(
              mergeMap((refreshResponse: AuthResponse) => {
                this.tokenService.setAuthToken(refreshResponse.access_token)
                // Clone the request and add the bearer token to the headers
                const newRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${refreshResponse.access_token}`
                  }
                });
                return next.handle(newRequest);
              }),
              catchError(() => {
                // Unable to renew token, redirect to login page
                this.tokenService.setAuthToken('');
                this.router.navigate(['/']);
                return throwError(error);
              })
            );
          } else {
            // Max retry count exceeded, redirect to login page
            this.tokenService.setAuthToken('');
            this.router.navigate(['/']);
            return throwError(error);
          }
        } else {
          return throwError(error);
        }
      })
    );
  }
}
