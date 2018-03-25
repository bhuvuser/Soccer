import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PlayersListPage } from '../players-list/players-list';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  homePage = HomePage;
  playersListTab = PlayersListPage;
  settingsTab = SettingsPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    if(navParams.data) {
      if(navParams.data.source !== 'notify') {
        this.toastCtrl.create({
          message: 'Welcome, login successful!',
          duration: 1500
        }).present();
      }
    }
  }
}
 