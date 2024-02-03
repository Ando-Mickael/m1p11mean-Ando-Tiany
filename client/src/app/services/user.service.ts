import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.get(url);
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get(url);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, userData);
  }
}
