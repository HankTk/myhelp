import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { PageContextService } from '../../services/page-context.service';
import { HelpService } from '../../services/help.service';

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
  @Input() language: string = 'en';

  private dialog = inject(MatDialog);
  private helpService = inject(HelpService);
  private pageContextService = inject(PageContextService);

  ngOnInit()
  {
    if (this.pageId) {
      this.pageContextService.setCurrentPage(this.pageId);
    }
  }

  private openDialogWithContent(content: string, currentPage: string): void
  {
    this.dialog.open(HelpDialogComponent, {
      width: '600px',
      height: '80vh',
      data: { content, pageId: currentPage },
      panelClass: ['help-dialog', 'help-dialog-backdrop'],
      hasBackdrop: true,
      autoFocus: true,
      position: { top: '64px' },
      disableClose: false
    });
  }

  openHelpDialog(): void
  {
    const currentPage = this.pageId || this.pageContextService.getCurrentPage();
    
    this.helpService.getHelpContent(this.language, `${currentPage}.html`)
      .subscribe({
        next: (content) => this.openDialogWithContent(content, currentPage),
        error: (error) => {
          console.error('Error loading help content:', error);
          this.helpService.getWelcomeContent(this.language)
            .subscribe({
              next: (content) => this.openDialogWithContent(content, 'welcome'),
              error: (error) => {
                console.error('Error loading welcome content:', error);
                this.openDialogWithContent('Help content not available for this page.', currentPage);
              }
            });
        }
      });
  }

} 