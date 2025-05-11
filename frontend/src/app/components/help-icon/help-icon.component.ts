import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PageContextService } from '../../services/page-context.service';

@Component({
  selector: 'app-help-icon',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, HttpClientModule],
  templateUrl: './help-icon.component.html',
  styleUrls: ['./help-icon.component.scss']
})
export class HelpIconComponent implements OnInit
{

  @Input() pageId?: string;
  @Input() language: string = 'en';

  private dialog = inject(MatDialog);
  private http = inject(HttpClient);
  private pageContextService = inject(PageContextService);

  ngOnInit()
  {
    if (this.pageId) {
      this.pageContextService.setCurrentPage(this.pageId);
    }
  }

  openHelpDialog(): void
  {
    const currentPage = this.pageId || this.pageContextService.getCurrentPage();
    
    // First try to get the specific page help
    this.http.get(`http://localhost:8080/api/help/content/${this.language}/${currentPage}.html`, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Error loading specific help content:', error);
          // If specific page help fails, try to get the welcome content
          return this.http.get(`http://localhost:8080/api/help/welcome?language=${this.language}`, { responseType: 'text' })
            .pipe(
              catchError(welcomeError => {
                console.error('Error loading welcome content:', welcomeError);
                return of('Help content not available for this page.');
              })
            );
        })
      )
      .subscribe(content => {
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
      });
  }

} 