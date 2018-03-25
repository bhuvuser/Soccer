import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { DataService } from '../../app/dataservice/data.service';
import { Storage } from '@ionic/storage';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  signupPage = SignupPage;
  tabsPage = TabsPage;
  forgotPassword = ForgotPasswordPage;
  loader: any;

  @ViewChild('email') email: any;
  @ViewChild('password') password: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private storage: Storage) { }

  login() {
    let canLogin = 0;
    let userEmail = this.email.value.trim();
    let userPassword = this.password.value.trim();

    this.loadingCtrl.create({
      content: "",
      duration: 100
    }).present();

    if (userEmail === "" || userPassword === "") {
      this.toastCtrl.create({
        message: "Email or Password cannot be blank!",
        duration: 1500
      }).present();
      return false;
    }

    this.dataService.getLoginStatus(userEmail, userPassword).subscribe(
      (data) => {
        canLogin = data;
        if (canLogin == 1) {
          //set local storages here
          this.storage.set('emailkey', userEmail);
          //ens set local storage

          setTimeout(() => {
            this.storage.get('emailkey').then(email => {
              console.log('email: ' + email);
            });
          }, 500);
          
          this.navCtrl.push(this.tabsPage);
        } else {
          this.toastCtrl.create({
            message: "Email or Password doesn't match",
            duration: 1500
          }).present();
        }
      },
      (error) => {
        //this.navCtrl.push(this.tabsPage);
      }
    );
  }

  setTestUser() {
    this.email.value = 'test@test.com';
    this.password.value = '123';
  }
}
