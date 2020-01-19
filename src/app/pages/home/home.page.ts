import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/services/API.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  events: any[];

  constructor(public api: API) {}

  ngOnInit() {

    this.api.getEvents().then(response => {

      this.events = response;

    }).catch(error => {

      console.log(error);

    });

  }

}
