import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:6001/api/user';
  constructor(private httpClient: HttpClient) {}
  private accessToken = 'token';

  login(email: string, password: string): Observable<ApiResponse<User>> {
    return this.httpClient
      .post<ApiResponse<User>>(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.statusCode === 200) {
            localStorage.setItem(this.accessToken, response.data.token);
          }

          return response;
        })
      );
  }

  register(email: string, password: string): Observable<ApiResponse<User>> {
    return this.httpClient
      .post<ApiResponse<User>>(`${this.baseUrl}/register`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.accessToken, response.data.token);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.accessToken);
    localStorage.removeItem('user');
  }

  get userAccessToken(): string | null {
    return localStorage.getItem(this.accessToken) || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessToken);
  }

  get currentLoggedUser(): User | null {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');

    return user;
  }
}
