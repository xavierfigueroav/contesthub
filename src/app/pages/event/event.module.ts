import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { StageDetailPopoverComponent } from 'src/app/components/stage-detail-popover/stage-detail-popover.component';
import { JoinModalComponent } from 'src/app/components/join-modal/join-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule
  ],
  declarations: [EventPage, StageDetailPopoverComponent, JoinModalComponent],
  entryComponents: [StageDetailPopoverComponent, JoinModalComponent]
})
export class EventPageModule {}
