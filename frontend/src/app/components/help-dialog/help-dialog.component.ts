import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface HelpDialogData {
  content: string;
  pageId: string;
}

@Component({
  selector: 'app-help-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div class="help-dialog-container">
      <h2 mat-dialog-title>
        Help - {{ getPageTitle() }}
      </h2>
      <mat-dialog-content>
        <div class="help-content" [innerHTML]="sanitizedContent"></div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="close()">Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .help-dialog-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    mat-dialog-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      margin: 0;
    }
    .help-content {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    :host ::ng-deep {
      h1 {
        color: #2c3e50;
        margin-top: 0;
        font-size: 24px;
      }
      h2 {
        color: #2c3e50;
        font-size: 20px;
        margin-top: 20px;
      }
      .section {
        margin-bottom: 20px;
      }
      .nav-links {
        background-color: #f8f9fa;
        padding: 16px;
        border-radius: 5px;
        margin: 16px 0;
      }
      .nav-links a {
        display: block;
        padding: 8px;
        color: #2c3e50;
        text-decoration: none;
        margin: 4px 0;
        border-left: 3px solid #3498db;
      }
      .nav-links a:hover {
        background-color: #e9ecef;
        border-left-color: #2c3e50;
      }
      ul {
        padding-left: 16px;
        margin: 8px 0;
      }
      li {
        margin-bottom: 6px;
      }
      p {
        margin-bottom: 12px;
      }
    }
  `]
})
export class HelpDialogComponent {
  sanitizedContent: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HelpDialogData,
    private sanitizer: DomSanitizer
  ) {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(data.content);
  }

  getPageTitle(): string {
    const pageTitles: { [key: string]: string } = {
      'welcome': 'Welcome Page',
      'page1': 'Page 1',
      'page2': 'Page 2',
      'index': 'Main Help'
    };
    return pageTitles[this.data.pageId] || this.data.pageId;
  }

  close(): void {
    this.dialogRef.close();
  }
} 