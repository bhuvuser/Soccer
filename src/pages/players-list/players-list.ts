import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from '../../app/dataservice/data.service';
import { PlayerDetailsPage } from './player-details/player-details';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'page-players-list',
  templateUrl: 'players-list.html',
})
export class PlayersListPage {
  players: any;
  playersInOut: any;
  loader: any;
  playerDetailsPage = PlayerDetailsPage;
  playerStatus: string = 'all';
  currentEmail: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public location: Location) {

    this.playerStatus = 'all';
    this.players = null;
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 15000
    });

    /*present loader by default, dismess when request successful and loaded*/
    this.loader.present();

    this.dataService.getPlayers().subscribe(
      (response) => {
        this.players = response;
        this.loader.dismiss();
      },
      (error) => {
        setTimeout(() => {
          this.players = dataService.getMockData();
        }, 15000);
      }
    );

    this.dataService.getPlayersWithAvailability().subscribe(
      (response) => {
        this.playersInOut = response;
      },
      (error) => {
        setTimeout(() => {
          this.playersInOut = this.dataService.getMockData();
        }, 15000);
      }
    );

    setTimeout(() => {
      this.storage.get('emailkey').then(email => {
        this.currentEmail = email;
      });
    }, 100);
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.dataService.getPlayers().subscribe(
      (response) => {
        this.players = response;
        this.loader.dismiss();
      },
      (error) => {
        setTimeout(() => {
          this.players = this.dataService.getMockData();
        }, 15000);
      }
    );

    this.dataService.getPlayersWithAvailability().subscribe(
      (response) => {
        this.playersInOut = response;
      },
      (error) => {
        setTimeout(() => {
          this.playersInOut = this.dataService.getMockData();
        }, 15000);
      }
    );

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  deletePlayer(email: string) {
    let deleteConfirmation = this.alertCtrl.create({
      title: email,
      message: 'Delete this player?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.dataService.deletePlayer(email).subscribe(
              () => {
                console.log(email + ' deleted!');
                setTimeout(() => {
                  this.dataService.getPlayers().subscribe(
                    (response) => {
                      this.players = response;
                    }
                  );
                }, 1000);
              },
              (error) => {
                console.log('Delete error! ' + error.message);
              }
            );
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!');
          }
        }
      ]
    });
    deleteConfirmation.present();
  }

  canEdit(player) {
    //admin or matching user
    return this.currentEmail === player.email;
  }

  canDelete(player) {
    //only admin can
    return player.isAdmin !== true && (this.currentEmail.toLowerCase() === 'admin@weekendsoccer.co.nz');
  }

  ionViewDidLoad() {

  }
}
