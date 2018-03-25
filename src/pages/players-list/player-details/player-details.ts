import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { DataService } from '../../../app/dataservice/data.service';

@Component({
  selector: 'page-player-details',
  templateUrl: 'player-details.html',
})

export class PlayerDetailsPage {
  player: any;
  editMode: boolean = false;
  loader: any = this.loadingCtrl.create({
    content: "Loading...",
    duration: 100
  });
  savedToast: any = this.toastCtrl.create({
    message: "Saved new details",
    duration: 500
  });

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public dataService: DataService,
    public toastCtrl: ToastController) {
    this.loader.present();
    if (navParams.data.editMode === true) {
      this.player = navParams.data.player;
      this.editMode = navParams.data.editMode;
    } else {
      this.player = navParams.data;
      this.editMode = false;
    }
  }

  onSave(newInfo) {
    if (newInfo.valid) {
      this.loader = this.loadingCtrl.create({
        content: "Saving...",
        duration: 150
      }).present();
      this.dataService.updatePlayer(newInfo.value).subscribe();
      setTimeout(() => {
        this.savedToast.present();
      }, 500);
    } else {
      this.savedToast = this.toastCtrl.create({
        message: "Unable to save changes!",
        duration: 1000
      }).present();
    }
  }
}
