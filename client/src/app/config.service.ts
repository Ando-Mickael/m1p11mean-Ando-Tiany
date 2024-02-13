import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private apiUrl = 'http://localhost:3000';

  getApiUrl(): string {
    return this.apiUrl;
  }
}
