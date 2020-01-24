import { Component, OnInit, ViewChild } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { API } from 'src/app/services/API.service';
import { SessionService } from 'src/app/services/session.service';
import { ToastController, NavController } from '@ionic/angular';
import { resolve } from 'url';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.page.html',
  styleUrls: ['./event-creation.page.scss'],
})
export class EventCreationPage implements OnInit {

  file: string;
  stages: any[];
  singleStage: boolean;

  fixTimedToastConfig = {
    message: '',
    duration: 3000
  };

  @ViewChild('name', { static: false }) name: any;
  @ViewChild('location', { static: false }) location: any;
  @ViewChild('description', { static: false }) description: any;
  @ViewChild('modality', { static: false }) modality: any;
  @ViewChild('startDate', { static: false }) startDate: any;
  @ViewChild('endDate', { static: false }) endDate: any;

  @ViewChild('ageForm', { static: false }) ageForm: any;
  @ViewChild('minAge', { static: false }) minAge: any;
  @ViewChild('maxAge', { static: false }) maxAge: any;

  @ViewChild('sizeForm', { static: false }) sizeForm: any;
  @ViewChild('minSize', { static: false }) minSize: any;
  @ViewChild('maxSize', { static: false }) maxSize: any;

  constructor(
    public api: API,
    public session: SessionService,
    public navigation: NavController,
    public chooser: FileChooser,
    public toast: ToastController) { }

  ngOnInit() {

    this.file = '';
    this.singleStage = true;
    this.stages = [];
    this.addStage();

  }

  deleteStage(index: number) {
    this.stages.splice(index, 1);
  }

  addStage() {
    this.stages.push({ name: '', description: '', startDate: '', endDate: ''});
  }

  openChooser() {
    this.chooser.open().then(uri => {
      this.file = uri;
      console.log(uri);
    })
    .catch(e => console.log(e));
  }

  createEvent() {

    this.api.postEvent(
      this.name.value,
      this.location.value,
      this.modality.value,
      this.description.value,
      this.startDate.value,
      this.endDate.value,
      this.session.userId
    ).then(response => {
      if (!this.singleStage) {

        this.stages.forEach(stage => {

          this.api.postStage(
            stage.name,
            stage.description,
            stage.startDate,
            stage.endDate,
            response.id
          ).catch(error => {
            this.fixTimedToastConfig.message = error;
            this.toast.create(this.fixTimedToastConfig).then(toast => toast.present());
            return Promise.reject(error);
          });

        });
      }
      return Promise.resolve(response);
    })
    .then(response => {
      if (this.ageForm.checked || this.sizeForm.checked) {

        this.api.postConstraint(
          this.minSize ? this.minSize.value : undefined,
          this.maxSize ? this.maxSize.value : undefined,
          this.minAge ? this.minAge.value : undefined,
          this.maxAge ? this.maxAge.value : undefined,
          response.id
        ).catch(error => {
          this.fixTimedToastConfig.message = error;
          this.toast.create(this.fixTimedToastConfig).then(toast => toast.present());
          return Promise.reject(error);
        });

      }
      this.fixTimedToastConfig.message = 'El evento fue creado con éxito';
      this.toast.create(this.fixTimedToastConfig).then(toast => toast.present());
      this.navigation.back();
    })
    .catch(error => {

      this.fixTimedToastConfig.message = error;
      this.toast.create(this.fixTimedToastConfig).then(toast => toast.present());

    });
  }

}
