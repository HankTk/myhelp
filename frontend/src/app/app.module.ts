import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { HelpDownloadDialogComponent } from './settings/help-download-dialog/help-download-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    AppComponent,
    SettingsComponent,
    HelpDownloadDialogComponent
  ],
  providers: []
})
export class AppModule { }
