import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { GroupsPageModule } from '../groups/groups.module';
import { DashboardPageModule } from '../dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    HomePageModule,
    GroupsPageModule,
    DashboardPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
