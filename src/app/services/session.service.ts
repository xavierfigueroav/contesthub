import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  name: string;
  userId: number;
  sessionType: string;

  constructor() { }

  isOrganizer() {
    return this.sessionType === 'org';
  }

}
