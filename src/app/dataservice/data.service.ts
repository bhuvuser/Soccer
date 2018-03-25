import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataService {
  apiPath: string = 'https://elementinn.com/MyFirstJavaTest/rest/';
  currentUser: string = '';
  email: string = '';

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  getLoginStatus(email: string, password: string): any {
    return this.httpClient.get(this.apiPath + 'register/login' + '?email='+ email + '&password=' + password);
  }

  getPlayers(): any {
    return this.httpClient.get(this.apiPath + 'register/get');
  }

  getPlayersWithAvailability(): any {
    return this.httpClient.get(this.apiPath + 'register/player');
  }

  getMockData(): any {
    let players: any = [{ "id": 0, "name": "Default User", "email": "default@default.co.nz", "mobile": "88888888", "company": "Home Company", "password": "default" }];
    return players;
  }

  registerPlayer(player) {
    return this.httpClient.post(this.apiPath + 'register/post', player);
  }

  updatePlayer(newInfo) {
    return this.httpClient.put(this.apiPath + 'register/update', newInfo);
  }

  getEmail(): any {
    setTimeout(() => {
      this.storage.get('emailkey').then(email => {
        this.currentUser = email;
      });
    }, 100);
  }

  getNotifyCounts(status: string) {
    this.getEmail();
    if(!status) {
      return this.httpClient.get(this.apiPath + 'register/notify');
    } else {
      return this.httpClient.get(this.apiPath + 'register/notify?notify=' + status + '&email=' + this.currentUser);
    }
  }

  deletePlayer(email: string) {
    return this.httpClient.put(this.apiPath + 'register/delete', { "email" : email});
  }

  resetPassword(email: string, name: string) {
    return this.httpClient.get(this.apiPath + 'register/resetPassword?email=' + email + "&name=" + name);
  }
}
