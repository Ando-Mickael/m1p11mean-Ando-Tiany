// special-offer.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialOfferService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  createSpecialOffer(data: {
    name: string;
    description: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/special-offers`, data);
  }
}
