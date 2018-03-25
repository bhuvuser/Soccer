import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, App, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { DataService } from '../../app/dataservice/data.service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  loginPage = LoginPage;
  status: string = '';
  tabsPage = TabsPage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private storage: Storage,
    private dataService: DataService,
    private toastCtrl: ToastController,
    private zone: NgZone) {
  }

  logOut() {
    this.storage.get('emailkey').then(email => {
      console.log('email: ' + email);
    });
    this.storage.clear().then(() => {
      console.log('all keys are cleared');
    });
    this.app.getRootNav().pop();
  }

  setStatus(tempStatus: string) {
    if (tempStatus !== '') {
      this.status = tempStatus;
    }
  }

  getSetNotifyCounts() {
    this.dataService.getNotifyCounts(this.status).subscribe(
      (response) => {
        this.toastCtrl.create({
          message: this.status.length === 1 ? 'Not notified! Please select' : 'Notification sent.',
          duration: 2000
        }).present();
        this.status = '';
        this.zone.run(() => {
          //todo: redirecting page to Home Tab after clicking notify all
          //this.navCtrl.setRoot(TabsPage, { 'source': 'notify' });
        });
      }
    );
  }
}
