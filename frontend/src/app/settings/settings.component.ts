import { Component, ViewChild, inject } from '@angular/core';
import { MatDrawer, MatSidenavModule, MatDrawerMode } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HelpDownloadDialogComponent } from './help-download-dialog/help-download-dialog.component';
import { LanguageService } from '../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  template: `
    <button mat-icon-button (click)="openSettings()" class="settings-button">
      <mat-icon>settings</mat-icon>
    </button>

    <div class="drawer-wrapper" [class.drawer-open]="drawer?.opened">
      <mat-drawer-container class="drawer-container">
        <mat-drawer-content>
          <ng-content></ng-content>
        </mat-drawer-content>
        <mat-drawer #drawer mode="over" position="end">
          <div class="drawer-content">
            <h2>{{ 'settings.title' | translate }}</h2>
            
            <div class="setting-section">
              <h3>{{ 'settings.language' | translate }}</h3>
              <mat-form-field appearance="fill">
                <mat-label>{{ 'common.language' | translate }}</mat-label>
                <mat-select [(ngModel)]="selectedLanguage" (selectionChange)="onLanguageChange($event.value)">
                  <mat-option value="en">{{ 'common.english' | translate }}</mat-option>
                  <mat-option value="ja">{{ 'common.japanese' | translate }}</mat-option>
                  <mat-option value="es">Español</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="setting-section">
              <h3>{{ 'common.help' | translate }}</h3>
              <button mat-button (click)="openHelpDownloadDialog()" class="help-settings-button">
                <mat-icon>help</mat-icon>
                {{ 'common.help' | translate }} {{ 'common.download' | translate }}
              </button>
            </div>
          </div>
        </mat-drawer>
      </mat-drawer-container>
    </div>
  `,
  styles: [`
    .settings-button {
      position: relative;
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
    .drawer-wrapper {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      pointer-events: none;
      z-index: 999;
    }
    .drawer-wrapper.drawer-open {
      pointer-events: auto;
    }
    .drawer-container {
      height: 100%;
      background: transparent;
    }
    .drawer-content {
      padding: 16px;
      min-width: 300px;
    }
    .drawer-content h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .setting-section {
      margin-bottom: 24px;
    }
    .setting-section h3 {
      color: #666;
      font-size: 16px;
      margin-bottom: 12px;
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
      width: 350px;
      background-color: white;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    ::ng-deep {
      .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }
      .mat-mdc-form-field-infix {
        padding: 8px 0;
        min-height: 40px;
      }
      .mat-mdc-select-panel {
        padding: 8px 0;
      }
      .mat-mdc-option {
        padding: 0 16px;
        height: 40px;
        line-height: 40px;
      }
      .mat-mdc-select-value {
        padding-right: 16px;
      }
      .mat-mdc-form-field-flex {
        padding: 0 16px;
      }
      .mat-mdc-select-arrow {
        margin-right: 8px;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    TranslateModule
  ]
})
export class SettingsComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  selectedLanguage: string = 'en';
  private languageService = inject(LanguageService);
  private dialog = inject(MatDialog);

  constructor() {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }

  openSettings() {
    this.drawer.toggle();
  }

  onLanguageChange(lang: string) {
    this.languageService.setLanguage(lang);
  }

  openHelpDownloadDialog() {
    this.dialog.open(HelpDownloadDialogComponent, {
      width: '600px',
      data: {}
    });
  }
} 