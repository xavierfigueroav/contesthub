import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePage } from './welcome.page';
import { TabsPage } from '../tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage
  },
  {
    path: 'tabs',
    component: TabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
