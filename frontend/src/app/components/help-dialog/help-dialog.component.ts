import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AsyncPipe } from '@angular/common';

interface HelpDialogData {
  content: string;
  pageId: string;
}

@Component({
  selector: 'app-help-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslatePipe, AsyncPipe],
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