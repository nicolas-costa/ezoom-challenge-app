import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setAuthToken(token: string): void {

    if(token.charAt(2) === '|') {
      token = token.substr(3);
    }

    localStorage.setItem('token', token);
  }

  hasToken(): boolean {
    const token = localStorage.getItem('token');

    return !(token === "" || token === null);
  }

  getAuthToken(): string|null {
    const token = localStorage.getItem('token');
    return token === "" || token === null ? null : token;
  }
}
