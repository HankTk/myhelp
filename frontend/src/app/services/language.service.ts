import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();
  private translations = new BehaviorSubject<any>({});
  translations$ = this.translations.asObservable();

  constructor(private http: HttpClient) {
    // Initialize language from localStorage or browser settings
    const savedLang = localStorage.getItem('preferredLanguage');
    const initialLang = savedLang || (navigator.language.split('-')[0] === 'ja' ? 'ja' : 'en');
    this.setLanguage(initialLang);
  }

  setLanguage(lang: string) {
    if (lang === 'ja' || lang === 'en') {
      this.currentLang.next(lang);
      localStorage.setItem('preferredLanguage', lang);
      document.documentElement.lang = lang;
      this.loadTranslations(lang);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }

  private loadTranslations(lang: string) {
    this.http.get(`/assets/i18n/${lang}.json`)
      .pipe(
        catchError(error => {
          console.error(`Error loading translations for ${lang}:`, error);
          return this.http.get(`/assets/i18n/en.json`); // Fallback to English
        })
      )
      .subscribe({
        next: (translations) => {
          console.log(`Loaded translations for ${lang}:`, translations);
          this.translations.next(translations);
        },
        error: (error) => {
          console.error(`Failed to load translations for ${lang}:`, error);
        }
      });
  }

  translate(key: string): Observable<string> {
    return this.translations$.pipe(
      map(translations => {
        const keys = key.split('.');
        let value = translations;
        for (const k of keys) {
          if (value && value[k] !== undefined) {
            value = value[k];
          } else {
            console.warn(`Translation key not found: ${key}`);
            return key; // Return the key if translation is not found
          }
        }
        return value;
      })
    );
  }
} 