import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/services/API.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  events: any[];

  constructor(public api: API, public session: SessionService) {}

  ngOnInit() { }

  ionViewWillEnter() {

    let events: Promise<any[]>;

    if (this.session.isOrganizer()) {
      events = this.api.getEventsByOrganizer(this.session.userId);
    } else {
      events = this.api.getEvents();
    }

    events.then(response => {

      this.events = response;

    }).catch(error => {

      console.log(error);

    });

  }

}
