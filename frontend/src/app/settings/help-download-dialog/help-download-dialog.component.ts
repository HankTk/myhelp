import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
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
      <table mat-table [dataSource]="helpFiles" class="help-table">
        <!-- Language Column -->
        <ng-container matColumnDef="language">
          <th mat-header-cell *matHeaderCellDef>Language</th>
          <td mat-cell *matCellDef="let help">{{help.language}}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let help">{{help.name}}</td>
        </ng-container>

        <!-- Version Column -->
        <ng-container matColumnDef="version">
          <th mat-header-cell *matHeaderCellDef>Version</th>
          <td mat-cell *matCellDef="let help">{{help.version}}</td>
        </ng-container>

        <!-- Action Column -->
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let help">
            <button mat-button color="primary" 
                    [disabled]="!help.available"
                    (click)="downloadHelp(help)">
              <mat-icon>download</mat-icon>
              Download
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .help-table {
      width: 100%;
    }
    .mat-mdc-header-cell {
      background-color: #f5f5f5;
      color: #333;
      font-weight: 500;
    }
    .mat-mdc-cell {
      padding: 12px 16px;
    }
    .mat-mdc-row:hover {
      background-color: #f8f9fa;
    }
    button[mat-button] {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    button[mat-button][disabled] {
      color: rgba(0, 0, 0, 0.38);
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
  ]
})
export class HelpDownloadDialogComponent {
  helpFiles: HelpFile[] = [
    { language: 'English', name: 'User Guide', version: '1.0', available: true },
    { language: 'Japanese', name: 'ユーザーガイド', version: '1.0', available: true },
    { language: 'Spanish', name: 'Guía del Usuario', version: '1.0', available: false }
  ];

  displayedColumns: string[] = ['language', 'name', 'version', 'action'];

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