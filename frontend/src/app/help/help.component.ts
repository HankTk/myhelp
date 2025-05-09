import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  languages: string[] = [];
  selectedLanguage: string = '';
  helpContent: string = '';
  currentPage: string = '';

  constructor(private http: HttpClient) {}

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