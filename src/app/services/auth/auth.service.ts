import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'auth/login';
  private readonly renewTokenUrl = 'auth/refresh-token';
  private readonly authBaseUrl = environment.baseUrl.replace('v1', '')

  constructor(private readonly http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authBaseUrl.concat(this.loginUrl), credentials);
  }

  renewToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authBaseUrl.concat(this.renewTokenUrl), {});
  }
}

export interface AuthResponse {
  access_token: string,
  expires_in: number,
  token_type: string
}
