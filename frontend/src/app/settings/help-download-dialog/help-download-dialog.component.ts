import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

interface HelpFile {
  language: string;
  name: string;
  version: string;
  available: boolean;
}

@Component({
  selector: 'app-help-download-dialog',
  template: `
    <h2 mat-dialog-title>Help Files</h2>
    <mat-dialog-content>
      <mat-list>
        <mat-list-item *ngFor="let help of helpFiles">
          <span matListItemTitle>{{help.name}} ({{help.language}})</span>
          <span matListItemLine>Version: {{help.version}}</span>
          <button mat-button color="primary" 
                  [disabled]="!help.available"
                  (click)="downloadHelp(help)">
            <mat-icon>download</mat-icon>
            Download
          </button>
        </mat-list-item>
      </mat-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ]
})
export class HelpDownloadDialogComponent {
  helpFiles: HelpFile[] = [
    { language: 'English', name: 'User Guide', version: '1.0', available: true },
    { language: 'Japanese', name: 'ユーザーガイド', version: '1.0', available: true },
    { language: 'Spanish', name: 'Guía del Usuario', version: '1.0', available: false }
  ];

  constructor(
    public dialogRef: MatDialogRef<HelpDownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  downloadHelp(help: HelpFile) {
    // TODO: Implement download functionality
    console.log('Downloading help file:', help);
  }

  close() {
    this.dialogRef.close();
  }
} 