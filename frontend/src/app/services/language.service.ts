import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  constructor(private translate: TranslateService) {
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
      this.translate.use(lang);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }
} 