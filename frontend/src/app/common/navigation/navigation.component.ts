import { Component, ViewChild, inject } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageContextService } from '../../services/page-context.service';

interface NavigationItem {
  path: string;
  translationKey: string;
  pageId: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    TranslateModule
  ]
})
export class NavigationComponent
{

  private pageContextService = inject(PageContextService);

  navigationItems: NavigationItem[] = [
    { path: '/welcome', translationKey: 'welcome.title', pageId: 'welcome' },
    { path: '/page1', translationKey: 'page1.title', pageId: 'page1' },
    { path: '/page2', translationKey: 'page2.title', pageId: 'page2' }
  ];

  onNavigation(item: NavigationItem): void
  {
    this.pageContextService.setCurrentPage(item.pageId);
  }

} 