import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/help';

  getIndexHtml(language: string = 'en'): Observable<string> {
    return this.http.get(`${this.baseUrl}/index?language=${language}`, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Error loading index content:', error);
          return of(`<div class="help-content">
            <h2>Welcome to Help</h2>
            <p>Welcome to the help system. Please select a specific page to view its help content.</p>
          </div>`);
        })
      );
  }

  getHelpContent(language: string = 'en', pageId: string = 'welcome'): Observable<string> {
    if (pageId === 'welcome') {
      return this.http.get(`${this.baseUrl}/content/${language}/welcome.html`, { responseType: 'text' })
        .pipe(
          catchError(error => {
            console.error('Error loading welcome content:', error);
            return this.getIndexHtml(language);
          })
        );
    }
    return this.http.get(`${this.baseUrl}/content/${language}/${pageId}.html`, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Error loading help content:', error);
          return of(`<div class="help-content">
            <h2>Help Content Not Available</h2>
            <p>Sorry, the help content for this page is not available at the moment.</p>
          </div>`);
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