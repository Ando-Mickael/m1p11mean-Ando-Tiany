import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  getAppointments(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments/${userId}`);
  }
}
