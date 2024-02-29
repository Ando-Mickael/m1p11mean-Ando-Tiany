import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
  this.apiUrl = configService.getApiUrl();
}

getPromotions(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/special-offers`);
}
}
