import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  users = {
    1: {name: 'Xavier', userId: 1, sessionType: 'prt'},
    2: {name: 'Paula', userId: 2, sessionType: 'prt'},
    3: {name: 'Milton', userId: 3, sessionType: 'prt'},
    4: {name: 'Organización X', userId: 1, sessionType: 'org'}
  };

  constructor(public session: SessionService) { }

  ngOnInit() {
  }

  login(id: number) {

    const user = this.users[id];

    this.session.name = user.name;
    this.session.userId = user.userId;
    this.session.sessionType = user.sessionType;

  }

}
