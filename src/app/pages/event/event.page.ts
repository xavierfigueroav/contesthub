import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/services/API.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, PopoverController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';
import * as moment from 'moment';
import { StageDetailPopoverComponent } from 'src/app/components/stage-detail-popover/stage-detail-popover.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  event: any;
  toastConfig = {
    message: '',
    duration: 3000
  };
  colors = ['primary', 'secondary', 'danger', 'success', 'warning'];
  showingStages = false;

  constructor(public api: API, public route: ActivatedRoute, public toast: ToastController, public popover: PopoverController) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.api.getEvent(params.id).then(response => {

        this.event = response;
        return this.api.getEventStages(this.event.id);

      }).then(eventStage => {

        this.event.stages = eventStage;

      }).catch(error => {

        this.toastConfig.message = error;
        this.toast.create(this.toastConfig).then(toast => toast.present());

      });
    });

  }

  async presentStageDetails(ev: any, stageIndex: number) {
    const popover = await this.popover.create({
      component: StageDetailPopoverComponent,
      componentProps: this.event.stages[stageIndex],
      event: ev,
    });
    popover.style.cssText = '--min-width: 95%; --max-width: 95%';
    return await popover.present();
  }

  getDate(date: string) {

    return moment(date).format('LL');

  }

}
