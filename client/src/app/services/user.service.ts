import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

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
