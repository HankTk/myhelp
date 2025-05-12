import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DownloadButtonComponent } from '../../download-button/download-button.component';
import { HelpService } from '../../services/help.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface HelpFile {
  language: string;
  name: string;
  version: string;
  available: boolean;
  code: string;
}

interface DownloadStatus {
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-help-download-dialog',
  templateUrl: './help-download-dialog.component.html',
  styleUrls: ['./help-download-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    DownloadButtonComponent,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HelpDownloadDialogComponent implements OnInit
{

  private http = inject(HttpClient);
  private helpService = inject(HelpService);
  private dialogRef = inject(MatDialogRef<HelpDownloadDialogComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private languageService = inject(LanguageService);

  isDownloading: boolean = false;
  statusMessage: string = '';
  statusType: 'success' | 'error' = 'success';

  helpFiles: HelpFile[] = [
    { language: 'common.english', name: 'help.download.userGuide', version: '1.0', available: false, code: 'en' },
    { language: 'common.japanese', name: 'help.download.userGuide', version: '1.0', available: false, code: 'ja' },
    { language: 'Español', name: 'Guía del Usuario', version: '1.0', available: false, code: 'es' }
  ];

  displayedColumns: string[] = ['language', 'name', 'version', 'action'];

  ngOnInit()
  {
    this.loadAvailableLanguages();
  }

  private loadAvailableLanguages()
  {
    this.helpService.getAvailableLanguages().subscribe({
      next: (languages) => {
        // Update availability based on backend response
        this.helpFiles = this.helpFiles.map(file => ({
          ...file,
          available: languages.includes(file.code)
        }));
      },
      error: (error) => {
        console.error('Error loading available languages:', error);
        this.statusMessage = 'help.download.error';
        this.statusType = 'error';
      }
    });
  }

  onDownloadStatus(event: DownloadStatus)
  {
    this.statusMessage = event.message;
    this.statusType = event.type;
  }

  close()
  {
    this.dialogRef.close();
  }

} 