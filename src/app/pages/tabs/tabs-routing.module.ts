import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { GroupsPage } from '../groups/groups.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children : [
      {
        path: 'home',
        children: [
          {
            path: '',
            component: HomePage
          }
        ]
      },
      {
        path: 'groups',
        children: [
          {
            path: '',
            component: GroupsPage
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
