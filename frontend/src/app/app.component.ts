import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SettingsComponent } from './settings/settings.component';
import { HelpIconComponent } from './components/help-icon/help-icon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()" aria-label="Menu">
        <mat-icon>menu</mat-icon>
      </button>
      <span>{{ title }}</span>
      <span class="spacer"></span>
      <app-settings></app-settings>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/welcome" routerLinkActive="active" (click)="sidenav.close()">Welcome</a>
          <a mat-list-item routerLink="/page1" routerLinkActive="active" (click)="sidenav.close()">Page 1</a>
          <a mat-list-item routerLink="/page2" routerLinkActive="active" (click)="sidenav.close()">Page 2</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="content">
          <app-help-icon [helpContent]="getHelpContent()"></app-help-icon>
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: calc(100vh - 64px);
    }
    mat-sidenav {
      width: 250px;
    }
    .content {
      padding: 20px;
    }
    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }
    .mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      line-height: 24px;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    SettingsComponent,
    HelpIconComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'myhelp';

  constructor(private router: Router) {}

  getHelpContent(): string {
    const currentRoute = this.router.url;
    switch (currentRoute) {
      case '/welcome':
        return 'Welcome to the application! This is the home page.';
      case '/page1':
        return 'This is Page 1. Here you can find specific information about this section.';
      case '/page2':
        return 'This is Page 2. Here you can find specific information about this section.';
      default:
        return 'This is the help content for the current page.';
    }
  }
}
