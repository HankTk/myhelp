import { Component, OnInit } from '@angular/core';
import { HelpService } from '../services/help.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome-container">
      <button mat-raised-button color="primary" class="help-button" (click)="navigateToHelp()">
        Help
      </button>
      <div [innerHTML]="welcomeContent">
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      position: relative;
    }
    .help-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  `]
})
export class WelcomeComponent implements OnInit {
  welcomeContent: SafeHtml = '';

  constructor(
    private helpService: HelpService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.helpService.getWelcomeContent().subscribe(
      content => {
        this.welcomeContent = this.sanitizer.bypassSecurityTrustHtml(content);
      },
      error => {
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

  navigateToHelp() {
    this.router.navigate(['/help']);
  }
} 