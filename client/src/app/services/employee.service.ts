import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getEmployeeById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/employees/${userId}`;
    return this.http.get(url);
  }

}
