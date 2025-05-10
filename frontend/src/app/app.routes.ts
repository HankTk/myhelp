import { Routes } from '@angular/router';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: '**', redirectTo: 'welcome' }
]; 