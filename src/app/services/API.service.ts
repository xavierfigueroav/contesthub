import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';


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

  getEventsByOrganizer(organizerId: string | number) {
    return new Promise<any[]>((resolve, reject) => {

      this.http.get(
        this.baseURL + '/events',
        { params: new HttpParams().set('organizer', organizerId.toString()) }).toPromise()
        .then(response => resolve(response as any[])).catch(error => reject(
          `El organizador no tiene eventos.\n${error.statusText} [status: ${error.status}]`
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

  postEvent(name: string,
            location: string,
            modality: string,
            description: string,
            startDate: string,
            endDate: string,
            organizer: string | number) {

    return new Promise<any>((resolve, reject) => {
      const data = new FormData();
      data.set('name', name);
      data.set('location', location);
      data.set('modality', modality);
      data.set('description', description);
      data.set('start_date', moment(startDate).toISOString());
      data.set('end_date', moment(endDate).toISOString());
      data.set('organizer', organizer.toString());

      this.http.post(this.baseURL + '/events/', data).toPromise()
        .then(response => resolve(response))
        .catch(error => reject(
          `Ocurrió un error al intentar crear el evento.\n${error.statusText} [status: ${error.status}]`
        ));

    });
  }

  postStage(
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    event: string | number) {

    return new Promise<any>((resolve, reject) => {

      const data = new FormData();
      data.set('name', name);
      data.set('description', description);
      data.set('start_date', moment(startDate).toISOString());
      data.set('end_date', moment(endDate).toISOString());
      data.set('event', event.toString());

      this.http.post(this.baseURL + '/event_stages/', data).toPromise()
        .then(response => resolve(response))
        .catch(error => reject(
          `Ocurrió un error al intentar crear la etapa.\n${error.statusText} [status: ${error.status}]`
        ));

    });
  }

  postConstraint(
    minSize?: number,
    maxSize?: number,
    minAge?: number,
    maxAge?: number,
    event?: string | number) {

    return new Promise<any>((resolve, reject) => {

      const data = new FormData();
      minSize && data.set('min_group_size', minSize.toString());
      maxSize && data.set('max_group_size', maxSize.toString());
      minAge && data.set('min_participant_age', minAge.toString());
      maxAge && data.set('max_participant_age', maxAge.toString());
      data.set('event', event.toString());

      this.http.post(this.baseURL + '/event_constraint/', data).toPromise()
        .then(response => resolve(response))
        .catch(error => reject(
          `Ocurrió un error al intentar crear la restricción.\n${error.statusText} [status: ${error.status}]`
        ));

    });

  }

  postGroup(participant: string | number, groupName: string, eventId: string | number) {
    return new Promise<any>((resolve, reject) => {

      const data = new FormData();
      data.set('name', groupName);

      this.http.post(this.baseURL + '/groups/', data).toPromise()
        .then(response => this.postMembership(participant, (response as any).id, eventId))
        .then(response => resolve(response))
        .catch(error => reject(
          `Ocurrió un error al intentar crear el grupo.\n${error.statusText} [status: ${error.status}]`
        ));

    });
  }

  joinGroup(participant: string | number, joinCode: string, event: string | number) {
    return new Promise<any>((resolve, reject) => {

      this.getGroupByJoinCode(joinCode)
        .then(response => this.postMembership(participant, response.id, event))
        .then(response => resolve(response))
        .catch(error => reject(
          error.status ?
            `Ocurrió un error al intentar unirte al grupo.\n${error.statusText} [status: ${error.status}]` :
            error
        ));

    });
  }

  postMembership(participant: string | number, group: string | number, event: string | number) {
    return new Promise<any>((resolve, reject) => {

      const data = new FormData();
      data.set('participant', participant.toString());
      data.set('group', group.toString());
      data.set('event', event.toString());

      this.http.post(this.baseURL + '/memberships/', data).toPromise()
        .then(response => resolve(response))
        .catch(error => reject(
          `Ocurrió un al intentar unirte al grupo.\n${error.statusText} [status: ${error.status}]`
        ));

    });
  }

  getGroupByJoinCode(joinCode: string) {
    return new Promise<any>((resolve, reject) => {

      this.http.get(
        this.baseURL + '/groups',
        { params: new HttpParams().set('join_code', joinCode) }).toPromise()
        .then(response => {

          const groups: any = response;
          if (groups.length > 0) {
            resolve(groups[0]);
          } else {
            reject('No existe ningún grupo con JoinCode: ' + joinCode);
          }

        }).catch(error => reject(
          `Ocurrió un error durante la búsqueda del grupo.\n${error.statusText} [status: ${error.status}]`
        ));

    });
  }

  getGroupsByEvent(event: string | number) {
    return new Promise<any[]>((resolve, reject) => {

      this.http.get(
        this.baseURL + '/memberships/',
        { params: new HttpParams().set('event', event.toString()) }
      ).toPromise().then(response => {

        const groups = [];
        (response as any[]).forEach(async membership => {
          const group = await this.getGroup(membership.group);
          const event = await this.getEvent(membership.event);
          const participants = [];
          group.participants.forEach(async participantId => {
            participants.push(await this.getParticipant(participantId));
          });
          group.participants = participants;
          group.event = event;
          groups.push(group);
        });
        resolve(groups);

      }).catch(error => reject(
        `Ocurrió un error al intentar recuperar los grupos.\n${error.statusText} [status: ${error.status}]`
      ));

    });
  }

  deleteEvent(event: string | number) {
    return new Promise<any>((resolve, reject) => {

      this.http.delete(this.baseURL + '/events/' + event.toString()).toPromise()
      .then(response => resolve(response))
      .catch(error => reject(
        `Ocurrió un error mientras se intentaba eliminar el grupo.\n${error.statusText} [status: ${error.status}]`
      ));

    });
  }

  verfiyParticipation(participant: string | number, event: string | number) {
    return new Promise<boolean>((resolve, reject) => {

      this.http.get(
        this.baseURL + '/memberships',
        {
          params: new HttpParams()
            .set('participant', participant.toString())
            .set('event', event.toString())
        }).toPromise().then(response => {

          const memberships: any = response;
          resolve(memberships.length > 0);

        }).catch(error => reject(
          `Ocurrió un error al intentar comprobar su participación en este evento.\n${error.statusText} [status: ${error.status}]`
        ));

    });
  }

  getGroupsByParticipant(participant: string | number) {
    return new Promise<any[]>((resolve, reject) => {

      this.http.get(
        this.baseURL + '/memberships',
        { params: new HttpParams().set('participant', participant.toString()) }).toPromise()
        .then(response => {
          const groups = [];
          (response as any[]).forEach(async membership => {
            const group = await this.getGroup(membership.group);
            const event = await this.getEvent(membership.event);
            const participants = [];
            group.participants.forEach(async participantId => {
              participants.push(await this.getParticipant(participantId));
            });
            group.participants = participants;
            group.event = event;
            groups.push(group);
          });
          resolve(groups);
        }).catch(error => reject(
          `El usuario no participa en ningún grupo.`
        ));

    });
  }

  getGroup(id: string | number) {
    return new Promise<any>((resolve, reject) => {

      this.http.get(this.baseURL + '/groups/' + id).toPromise()
        .then(response => resolve(response))
        .catch(error => reject(
          `Ocurrió un error al intentar recuperar el grupo.\n${error.statusText} [status: ${error.status}]`
        ));

    });
  }

  getParticipant(id: string | number) {
    return new Promise<any>((resolve, reject) => {

      this.http.get(this.baseURL + '/participants/' + id).toPromise()
        .then(response => resolve(response))
        .catch(error => reject(
          `Ocurrió un error al intentar recuperar el participante.\n${error.statusText} [status: ${error.status}]`
        ));

    });
  }

}
