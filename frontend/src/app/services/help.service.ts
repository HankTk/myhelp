import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService 
{
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/help';  // Updated to use full backend URL

  getWelcomeContent(): Observable<string> 
  {
    return this.http.get(`${this.baseUrl}/welcome`, { responseType: 'text' });
  }
} 