import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password })
  }

  login(username: string, password: string) {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, { username, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
} 

