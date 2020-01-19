import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-stage-detail-popover',
  templateUrl: './stage-detail-popover.component.html',
  styleUrls: ['./stage-detail-popover.component.scss'],
})
export class StageDetailPopoverComponent implements OnInit {

  stage: any;

  constructor(public navParams: NavParams) { }

  ngOnInit() {
    this.stage = this.navParams.data;
  }

  getDate(date: string) {

    return moment(date).format('LL');

  }

  getTime(date: string) {

    return moment(date).format('LT');

  }

}
