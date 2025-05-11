import { Component, Inject, inject } from '@angular/core';
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
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent
{

  private dialogRef = inject(MatDialogRef<HelpDialogComponent>);
  private data = inject<HelpDialogData>(MAT_DIALOG_DATA);
  private sanitizer = inject(DomSanitizer);
  
  sanitizedContent: SafeHtml;

  constructor() {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.data.content);
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