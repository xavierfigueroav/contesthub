import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { StageDetailPopoverComponent } from 'src/app/components/stage-detail-popover/stage-detail-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule
  ],
  declarations: [EventPage, StageDetailPopoverComponent],
  entryComponents: [StageDetailPopoverComponent]
})
export class EventPageModule {}
