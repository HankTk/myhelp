import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-download-button',
  template: `
    <div class="download-container">
      <button (click)="processDownload()" [disabled]="isProcessing || disabled">
        {{ isProcessing ? 'Processing...' : 'Download Help (' + lang.toUpperCase() + ')' }}
      </button>
    </div>
  `,
  styleUrls: ['./download-button.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class DownloadButtonComponent {
  private http = inject(HttpClient);

  @Input() lang: string = 'ja';
  @Input() disabled: boolean = false;
  @Output() statusChange = new EventEmitter<{ message: string; type: 'success' | 'error' }>();
  isProcessing: boolean = false;

  processDownload() {
    if (this.disabled) return;
    
    this.isProcessing = true;
    
    console.log('Starting download for language:', this.lang);
    
    this.http.get(`http://localhost:8080/api/repository/download-language/${this.lang}`, { 
      responseType: 'blob',
      observe: 'response'
    })
    .subscribe({
      next: this.handleDownloadSuccess.bind(this),
      error: this.handleDownloadError.bind(this)
    });
  }

  private handleDownloadSuccess(response: HttpResponse<Blob>): void {
    console.log('Received response:', response);
    const blob = response.body;
    if (!blob) {
      console.error('No blob received in response');
      this.showError('Error: No file content received');
      return;
    }

    // File is already saved in help-files/download by the backend
    this.showSuccess(`Help files for ${this.lang.toUpperCase()} have been downloaded successfully.`);
  }

  private handleDownloadError(error: any): void {
    console.error('Download error:', error);
    this.showError('Error downloading file. Please try again.');
  }

  private showSuccess(message: string): void {
    this.statusChange.emit({ message, type: 'success' });
    this.isProcessing = false;
  }

  private showError(message: string): void {
    this.statusChange.emit({ message, type: 'error' });
    this.isProcessing = false;
  }
}
