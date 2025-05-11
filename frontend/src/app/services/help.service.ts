import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/help';

  getWelcomeContent(language: string = 'en'): Observable<string> {
    return this.http.get(`${this.baseUrl}/welcome?language=${language}`, { responseType: 'text' });
  }

  getHelpContent(language: string, fileName: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/content/${language}/${fileName}`, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Error loading help content:', error);
          return this.getWelcomeContent(language);
        })
      );
  }

  getAvailableLanguages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/languages`);
  }

  downloadLanguageHelp(language: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download-language/${language}`, {
      responseType: 'blob'
    });
  }
} 