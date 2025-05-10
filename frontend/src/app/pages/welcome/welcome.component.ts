import { Component, OnInit, inject } from '@angular/core';
import { HelpService } from '../../services/help.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class WelcomeComponent implements OnInit
{

  private helpService = inject(HelpService);
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);

  welcomeContent: SafeHtml = '';

  ngOnInit()
  {
    this.helpService.getWelcomeContent().subscribe(
      (content: string) => {
        this.welcomeContent = this.sanitizer.bypassSecurityTrustHtml(content);
      },
      (error: any) => {
        console.error('Error loading welcome content:', error);
        this.welcomeContent = this.sanitizer.bypassSecurityTrustHtml(`
          <div class="error-message">
            <h1>Welcome to MyHelp</h1>
            <p>Unable to load welcome content. Please try again later.</p>
          </div>
        `);
      }
    );
  }

  navigateToHelp()
  {
    this.router.navigate(['/help']);
  }

} 