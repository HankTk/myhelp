import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HelpViewerDialogComponent } from '../../dialogs/help-viewer-dialog/help-viewer-dialog.component';
import { PageContextService } from '../../services/page-context.service';
import { HelpService } from '../../services/help.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-help-icon',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './help-icon.component.html',
  styleUrls: ['./help-icon.component.scss']
})
export class HelpIconComponent implements OnInit
{

  @Input() pageId?: string;

  private dialog = inject(MatDialog);
  private helpService = inject(HelpService);
  private pageContextService = inject(PageContextService);
  private languageService = inject(LanguageService);

  ngOnInit()
  {
    if (this.pageId) {
      this.pageContextService.setCurrentPage(this.pageId);
    }
  }

  private openDialogWithContent(content: string, currentPage: string): void
  {
    this.dialog.open(HelpViewerDialogComponent, {
      width: '1200px',
      height: '80vh',
      data: { content, pageId: currentPage },
      panelClass: ['help-dialog', 'help-dialog-backdrop'],
      hasBackdrop: true,
      autoFocus: true,
      position: { top: '10vh' },
      disableClose: false
    });
  }

  private handleWelcomeContentSuccess(content: string): void
  {
    this.openDialogWithContent(content, 'welcome');
  }

  private handleWelcomeContentError(error: any, currentPage: string): void
  {
    console.error('Error loading welcome content:', error);
    this.openDialogWithContent('Help content not available for this page.', currentPage);
  }

  private handleHelpContentSuccess(content: string, currentPage: string): void
  {
    this.openDialogWithContent(content, currentPage);
  }

  private handleHelpContentError(error: any, currentLang: string, currentPage: string): void
  {
    console.error('Error loading help content:', error);
    this.helpService.getWelcomeContent(currentLang)
      .subscribe({
        next: (content) => this.handleWelcomeContentSuccess(content),
        error: (error) => this.handleWelcomeContentError(error, currentPage)
      });
  }

  openHelpDialog(): void
  {
    const currentPage = this.pageId || this.pageContextService.getCurrentPage();
    const currentLang = this.languageService.getCurrentLanguage();

    this.helpService.getHelpContent(currentLang, `${currentPage}.html`)
      .subscribe({
        next: (content) => this.handleHelpContentSuccess(content, currentPage),
        error: (error) => this.handleHelpContentError(error, currentLang, currentPage)
      });
  }

}
