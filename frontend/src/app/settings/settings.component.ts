import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule, MatDrawerMode } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HelpDownloadDialogComponent } from './help-download-dialog/help-download-dialog.component';

@Component({
  selector: 'app-settings',
  template: `
    <button mat-icon-button (click)="openSettings()" class="settings-button">
      <mat-icon>settings</mat-icon>
    </button>

    <mat-drawer-container class="drawer-container">
      <mat-drawer-content>
        <ng-content></ng-content>
      </mat-drawer-content>
      <mat-drawer #drawer mode="over" position="end">
        <div class="drawer-content">
          <h2>Settings</h2>
          <button mat-button (click)="openHelpDownloadDialog()" class="help-settings-button">
            <mat-icon>help</mat-icon>
            Help Settings
          </button>
        </div>
      </mat-drawer>
    </mat-drawer-container>
  `,
  styles: [`
    .settings-button {
      position: fixed;
      top: 8px;
      right: 16px;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
    }
    .settings-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .settings-button mat-icon {
      color: white;
    }
    .drawer-container {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: transparent;
      z-index: 999;
    }
    .drawer-content {
      padding: 16px;
      min-width: 300px;
    }
    .drawer-content h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .help-settings-button {
      color: white;
      background-color: #1976d2;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    .help-settings-button:hover {
      background-color: #1565c0;
    }
    .help-settings-button mat-icon {
      color: white;
    }
    mat-drawer {
      width: 300px;
      background-color: white;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SettingsComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private dialog: MatDialog) {}

  openSettings() {
    this.drawer.toggle();
  }

  openHelpDownloadDialog() {
    this.dialog.open(HelpDownloadDialogComponent, {
      width: '600px',
      data: {}
    });
  }
} 