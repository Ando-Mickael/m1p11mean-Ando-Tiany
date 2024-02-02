import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createService(newService: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/services`, newService);
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  updateService(serviceId: string, serviceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/services/${serviceId}`, serviceData);
  }

  deleteService(serviceId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/services/${serviceId}`);
  }
}
