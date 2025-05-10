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
          <button mat-button (click)="openHelpDownloadDialog()">
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
    }
    .settings-button mat-icon {
      color: white;
    }
    .drawer-container {
      position: fixed;
      top: 64px;
      bottom: 0;
      left: 0;
      right: 0;
      background: transparent;
    }
    .drawer-content {
      padding: 16px;
    }
    mat-drawer {
      width: 300px;
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