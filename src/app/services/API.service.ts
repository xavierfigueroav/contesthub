import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable()
export class API {

  baseURL = 'http://192.168.100.241:8000/api';

  constructor(public http: HttpClient) { }

  getEvent(eventId: string | number) {
    return new Promise<any>((resolve, reject) => {

      this.http.get(this.baseURL + '/events/' + eventId).toPromise()
      .then(response => resolve(response))
      .catch(error => reject(
        `Ocurrió un error al intentar consultar el evento.\n${error.statusText} [status: ${error.status}]`
      ));

    });
  }

  getEvents() {
    return new Promise<any[]>((resolve, reject) => {

      this.http.get(this.baseURL + '/events').toPromise()
      .then(response => resolve(response as any[]))
      .catch(error => reject(
        `Ocurrió un error al intentar recuperar los eventos.\n${error.statusText} [status: ${error.status}]`
      ));

    });
  }

  getEventStages(eventId: string | number) {
    return new Promise<any[]>((resolve, reject) => {

      this.http.get(
        this.baseURL + '/event_stages',
        { params: new HttpParams().set('event', eventId.toString()) }).toPromise()
      .then(response => resolve(response as any[]))
      .catch(error => reject(
        `Ocurrió un error al intentar recuperar las etapas del evento.\n${error.statusText} [status: ${error.status}]`
      ));

    });
  }

}
