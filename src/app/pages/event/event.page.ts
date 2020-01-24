import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/services/API.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, PopoverController, ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { StageDetailPopoverComponent } from 'src/app/components/stage-detail-popover/stage-detail-popover.component';
import { JoinModalComponent } from 'src/app/components/join-modal/join-modal.component';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  event: any;
  colors = ['primary', 'secondary', 'danger', 'success', 'warning'];
  showingStages = false;
  infitineToastConfig = { message: '' };
  fixTimedToastConfig = {
    message: '',
    duration: 3000
  };
  isParticipant = false;

  constructor(
    public api: API,
    public session: SessionService,
    public navigation: NavController,
    public route: ActivatedRoute,
    public toast: ToastController,
    public popover: PopoverController,
    public modal: ModalController) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.api.getEvent(params.id).then(response => {

        this.event = response;
        if (this.session.isOrganizer()) {
          return Promise.resolve(false);
        }
        return this.api.verfiyParticipation(this.session.userId, this.event.id);

      }).then(isParticipant => {

        this.isParticipant = isParticipant;
        return this.api.getEventStages(this.event.id);

      }).then(eventStage => {

        this.event.stages = eventStage;
        return this.api.getGroupsByEvent(this.event.id);

      }).then(groups => {

        console.log(groups);

        this.event.groups = groups;

      }).catch(error => {

        this.fixTimedToastConfig.message = error;
        this.toast.create(this.fixTimedToastConfig).then(toast => toast.present());

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

  async joinEvent() {

    const modal = await this.modal.create({
      component: JoinModalComponent,
      componentProps: this.event
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data === undefined) { return; }

    this.infitineToastConfig.message = 'Creando el grupo...';
    const loadingToast = await this.toast.create(this.infitineToastConfig);
    loadingToast.present();

    if (data.newGroup) {

      this.api.postGroup(1, data.group, this.event.id).then(response => {

        this.isParticipant = true;
        this.fixTimedToastConfig.message = `El grupo '${data.group}' ha sido creado y perteneces a él.`;

      }).catch(error => {

        this.fixTimedToastConfig.message = error;

      }).finally(() => {

        setTimeout(() => {
          loadingToast.dismiss();
          this.toast.create(this.fixTimedToastConfig).then(toast => toast.present());
        }, 1000);

      });

    } else {

      this.api.joinGroup(1, data.group, this.event.id).then(response => {

        this.isParticipant = true;
        this.fixTimedToastConfig.message = `Te has unido al grupo con JoinCode '${data.group}'`;

      }).catch(error => {

        this.fixTimedToastConfig.message = error;

      }).finally(() => {
        setTimeout(() => {
          loadingToast.dismiss();
          this.toast.create(this.fixTimedToastConfig).then(toast => toast.present());
        }, 1000);
      });

    }
  }

  async deleteEvent() {

    this.infitineToastConfig.message = 'Eliminando el grupo...';
    const loadingToast = await this.toast.create(this.infitineToastConfig);
    loadingToast.present();

    this.api.deleteEvent(this.event.id).then(() => {

      this.fixTimedToastConfig.message = 'El grupo fue eliminado con éxito';
      setTimeout(() => {
        this.navigation.back();
      }, 1000);

    }).catch(error => {

      this.fixTimedToastConfig.message = error;

    }).finally(() => {
      setTimeout(() => {
        loadingToast.dismiss();
        this.toast.create(this.fixTimedToastConfig).then(toast => toast.present());
      }, 1000);
    });
  }

  getDate(date: string) {

    return moment(date).format('LL');

  }

}
