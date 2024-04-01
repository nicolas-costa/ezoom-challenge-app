import { Injectable } from '@angular/core';
import { HttpClient as AngularHttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClient {
  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: AngularHttpClient) { }

  public get<T>(url: string, options?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, options).pipe(
      map((response: any) => response as T),
      catchError(this.handleError)
    );
  }

  public post<T>(url: string, data: any, options?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, data, options).pipe(
      map((response: any) => response as T),
      catchError(this.handleError)
    );
  }

  public put<T>(url: string, data: any, options?: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`, data, options).pipe(
      map((response: any) => response as T),
      catchError(this.handleError)
    );
  }

  public delete<T>(url: string, options?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`, options).pipe(
      map((response: any) => response as T),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

