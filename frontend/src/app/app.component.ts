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
import { PageContextService } from './services/page-context.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent 
{
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'My Application';

  constructor(
    private router: Router,
    private pageContextService: PageContextService
  ) 
  {
  }

  toggleSidenav() 
  {
    this.sidenav.toggle();
  }

  onNavigation(pageId: string) 
  {
    this.pageContextService.setCurrentPage(pageId);
  }
}
