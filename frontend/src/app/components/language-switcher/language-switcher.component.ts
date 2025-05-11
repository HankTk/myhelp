import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, TranslatePipe, AsyncPipe],
  template: `
    <button mat-button [matMenuTriggerFor]="menu">
      {{ (currentLang === 'en' ? 'common.english' : 'common.japanese') | translate | async }}
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="switchLanguage('en')">
        {{ 'common.english' | translate | async }}
      </button>
      <button mat-menu-item (click)="switchLanguage('ja')">
        {{ 'common.japanese' | translate | async }}
      </button>
    </mat-menu>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit {
  currentLang: string;

  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      console.log('Language changed to:', lang);
      this.currentLang = lang;
    });
  }

  switchLanguage(lang: string) {
    console.log('Switching language to:', lang);
    this.languageService.setLanguage(lang);
  }
} 