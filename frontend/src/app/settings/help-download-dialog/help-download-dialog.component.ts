import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DownloadButtonComponent } from '../../download-button/download-button.component';
import { HelpService } from '../../services/help.service';

interface HelpFile {
  language: string;
  name: string;
  version: string;
  available: boolean;
  code: string;
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
    DownloadButtonComponent
  ]
})
export class HelpDownloadDialogComponent implements OnInit
{

  private http = inject(HttpClient);
  private helpService = inject(HelpService);
  private dialogRef = inject(MatDialogRef<HelpDownloadDialogComponent>);
  private data = inject(MAT_DIALOG_DATA);

  isDownloading: boolean = false;
  statusMessage: string = '';
  statusType: 'success' | 'error' = 'success';

  helpFiles: HelpFile[] = [
    { language: 'English', name: 'User Guide', version: '1.0', available: false, code: 'en' },
    { language: 'Japanese', name: 'ユーザーガイド', version: '1.0', available: false, code: 'ja' },
    { language: 'Spanish', name: 'Guía del Usuario', version: '1.0', available: false, code: 'es' }
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
        this.statusMessage = 'Error loading available languages';
        this.statusType = 'error';
      }
    });
  }

  onDownloadStatus(event: { message: string; type: 'success' | 'error' })
  {
    this.statusMessage = event.message;
    this.statusType = event.type;
  }

  close()
  {
    this.dialogRef.close();
  }

} 