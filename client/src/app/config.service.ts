import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private apiUrl = 'https://api-minishop.vercel.app';

  getApiUrl(): string {
    return this.apiUrl;
  }
}
