import { Component, ViewChild, inject } from '@angular/core';
import { MatDrawer, MatSidenavModule, MatDrawerMode } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HelpDownloadDialogComponent } from '../dialogs/help-download-dialog/help-download-dialog.component';
import { LanguageService } from '../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
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
export class SettingsComponent 
{

  @ViewChild('drawer') drawer!: MatDrawer;
  selectedLanguage: string = 'en';
  private languageService = inject(LanguageService);
  private dialog = inject(MatDialog);

  constructor() 
  {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }

  openSettings() 
  {
    this.drawer.toggle();
  }

  onLanguageChange(lang: string) 
  {
    this.languageService.setLanguage(lang);
  }

  openHelpDownloadDialog() 
  {
    this.dialog.open(HelpDownloadDialogComponent, 
    {
      width: '600px',
      data: {}
    });
  }

}
