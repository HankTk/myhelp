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
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    HelpIconComponent,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent 
{
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'My Application';

  constructor(
    private router: Router,
    private pageContextService: PageContextService,
    private translate: TranslateService
  ) 
  {
    // Set default language
    translate.setDefaultLang('en');
    // Use browser language if available
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|ja/) ? browserLang : 'en');
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
