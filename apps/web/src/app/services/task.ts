import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  findAll() {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  create(title: string, description: string) {
    return this.http.post(this.apiUrl, { title, description }, this.getHeaders());
  }

  update(id: string, status: string) {
    return this.http.patch(`${this.apiUrl}/${id}`, { status }, this.getHeaders());
  }

  remove(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
