import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { DownloadButtonComponent } from '../download-button/download-button.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, DownloadButtonComponent]
})
export class HelpComponent implements OnInit {

  private http = inject(HttpClient);

  languages: string[] = [];
  selectedLanguage: string = '';
  helpContent: string = '';
  currentPage: string = '';

  ngOnInit() {
    this.loadLanguages();
  }

  loadLanguages() {
    this.http.get<string[]>('http://localhost:8080/api/repository/languages')
      .subscribe(languages => {
        this.languages = languages;
        if (languages.length > 0) {
          this.selectedLanguage = languages[0];
        }
      });
  }

  onLanguageChange(event: MatSelectChange) {
    this.selectedLanguage = event.value;
    this.loadHelpContent();
  }

  loadHelpContent() {
    if (this.selectedLanguage && this.currentPage) {
      this.http.get(`http://localhost:8080/api/help/download/${this.selectedLanguage}/${this.currentPage}`, { responseType: 'text' })
        .subscribe(content => {
          this.helpContent = content;
        });
    }
  }

  setCurrentPage(pageId: string) {
    this.currentPage = pageId;
    this.loadHelpContent();
  }

} 