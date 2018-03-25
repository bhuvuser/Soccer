import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DataService } from '../../app/dataservice/data.service';
import { PlayerDetailsPage } from '../players-list/player-details/player-details';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  counts: any = {
    "In": 0,
    "Maybe": 0
  };
  inCount: number = 0;
  outCount: number = 0;
  players: any;
  me: any;
  currentUser: string;
  currentUserName: string;
  playerDetailsPage = PlayerDetailsPage;

  constructor(public navCtrl: NavController, public storage: Storage, public dataService: DataService) {
    //retrieve player name from email address for home title
    dataService.getPlayers().subscribe(
      (response) => {
        this.players = response;

        setTimeout(() => {
          this.storage.get('emailkey').then(email => {
            this.currentUser = email;
            for (var p = 0; p < this.players.length; p++) {
              if (this.players[p].email === this.currentUser) {
                this.currentUserName = this.players[p].name;
                this.me = this.players[p];
                break;
              }
            }
          });
        }, 100);
      });
  }

  showMyProfile() {
    this.navCtrl.push(this.playerDetailsPage, this.me);
  }
  
  ionViewWillEnter() {
    this.dataService.getNotifyCounts('').subscribe(
      (response) => {
        this.counts = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
