import { Component, Input, OnInit, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-help-viewer',
  templateUrl: './help-viewer.component.html',
  styleUrls: ['./help-viewer.component.scss']
})
export class HelpViewerComponent implements OnInit {
  @Input() page: string = 'dashboard';
  private languageService = inject(LanguageService);
  currentLang: string = 'en';

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  get helpUrl() {
    return `/help/${this.currentLang}/${this.page}.html`;
  }
}
