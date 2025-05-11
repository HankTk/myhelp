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
    
    console.log('Starting download for language:', this.lang);
    
    this.http.get(`http://localhost:8080/api/repository/download-language/${this.lang}`, { 
      responseType: 'blob',
      observe: 'response'
    })
    .subscribe({
      next: (response) => 
      {
        console.log('Received response:', response);
        const blob = response.body;
        if (!blob) {
          console.error('No blob received in response');
          this.message = 'Error: No file content received';
          this.isProcessing = false;
          return;
        }

        const filename = `help-${this.lang}.zip`;
        console.log('Creating download for file:', filename);
        
        // Create a download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(link.href);
        
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
        console.error('Download error:', error);
        this.message = 'Error downloading file. Please try again.';
        this.isProcessing = false;
      }
    });
  }
}
