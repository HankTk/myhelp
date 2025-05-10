import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HelpComponent } from './help/help.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 