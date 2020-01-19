import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/services/API.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  groups: any;

  constructor(public api: API) { }

  ngOnInit() { }

  ionViewWillEnter() {

    this.api.getGroupsByParticipant(1).then(response => {
      this.groups = response;
      console.log(response);
    }).catch(error => {
      console.log(error);
    });

  }

}
