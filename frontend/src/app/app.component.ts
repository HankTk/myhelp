import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SettingsComponent } from './common/settings/settings.component';
import { HelpIconComponent } from './components/help-icon/help-icon.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationComponent } from './common/navigation/navigation.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    SettingsComponent,
    HelpIconComponent,
    TranslateModule,
    NavigationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent
{

  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'My Application';

  constructor(
    private router: Router,
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

}
