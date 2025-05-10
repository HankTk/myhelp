import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()" aria-label="Menu">
        <mat-icon>menu</mat-icon>
      </button>
      <span>{{ title }}</span>
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
          <app-settings></app-settings>
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
    SettingsComponent
  ]
})
export class AppComponent {
  title = 'myhelp';
}
