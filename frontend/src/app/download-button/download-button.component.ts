import { Component, Input, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class DownloadButtonComponent 
{

  private http = inject(HttpClient);

  @Input() lang: string = 'ja';
  message: string = '';
  isProcessing: boolean = false;

  processDownload() 
  {
    this.isProcessing = true;
    this.message = 'Processing...';
    
    this.http.get(`http://localhost:8080/api/repository/download-language/${this.lang}`, { responseType: 'text' })
      .subscribe({
        next: (response) => 
        {
          this.message = 'Download completed successfully!';
          this.isProcessing = false;
          // Clear the message after 3 seconds
          setTimeout(() => 
          {
            this.message = '';
          }, 3000);
        },
        error: (error) => 
        {
          this.message = 'Error processing file. Please try again.';
          this.isProcessing = false;
          console.error('Error processing file:', error);
        }
      });
  }

}
