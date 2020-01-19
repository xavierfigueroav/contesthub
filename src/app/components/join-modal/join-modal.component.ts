import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.scss'],
})
export class JoinModalComponent implements OnInit {

  event: any;
  newGroup: any;
  @ViewChild('groupName', { static: false }) groupName: ElementRef;
  @ViewChild('joinCode', { static: false }) joinCode: ElementRef;

  constructor(public navParams: NavParams, public modal: ModalController) { }

  ngOnInit() {
    this.newGroup = true;
    this.event = this.navParams.data;
  }

  joinEvent() {

    this.modal.dismiss({
      newGroup: this.newGroup,
      group: this.newGroup ? (this.groupName as any).value : (this.joinCode as any).value
    });

  }

  cancel() {
    this.modal.dismiss();
  }

}
