import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface HelpDialogData {
  content: string;
  pageId: string;
}

@Component({
  selector: 'app-help-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent
{
  sanitizedContent: SafeHtml;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<HelpDialogComponent>,
    private sanitizer: DomSanitizer
  ) {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.data.content);
  }

  getPageTitle(): string {
    const pageTitles: { [key: string]: string } = {
      'welcome': 'help.pages.welcome',
      'page1': 'help.pages.page1',
      'page2': 'help.pages.page2',
      'index': 'help.pages.index'
    };
    return pageTitles[this.data.pageId] || this.data.pageId;
  }

  close(): void {
    this.dialogRef.close();
  }
} 