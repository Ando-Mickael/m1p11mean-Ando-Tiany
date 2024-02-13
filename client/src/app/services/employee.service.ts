import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  getEmployees(): Observable<any> {
    const url = `${this.apiUrl}/employees`;
    return this.http.get(url);
  }

  getEmployeeById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/employees/${userId}`;
    return this.http.get(url);
  }

  updateEmployee(userId: string, formData: any): Observable<any> {
    const url = `${this.apiUrl}/employees/${userId}`;
    return this.http.post(url, formData);
  }
}
