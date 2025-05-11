import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, TranslateModule]
})
export class LanguageSwitcherComponent implements OnInit {
  currentLang: string = 'en';

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  switchLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.currentLang = lang;
  }
} 