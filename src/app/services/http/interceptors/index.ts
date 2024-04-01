import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './renew-token.interceptor';
import { AuthInterceptor } from "./auth.interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
