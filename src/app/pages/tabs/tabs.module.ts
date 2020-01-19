import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { GroupsPageModule } from '../groups/groups.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    HomePageModule,
    GroupsPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
