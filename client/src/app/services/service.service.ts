import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  createService(newService: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/services`, newService);
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  updateService(serviceId: string, serviceData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/services/${serviceId}`,
      serviceData
    );
  }

  deleteService(serviceId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/services/${serviceId}`);
  }
}
