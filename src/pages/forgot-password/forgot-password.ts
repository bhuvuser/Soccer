import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DataService } from '../../app/dataservice/data.service';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  @ViewChild('email') email: any;
  @ViewChild('name') name: any;

  loginPage: LoginPage;
  tempEmail: string;
  tempName: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataService: DataService, 
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  backTologinPage() {
    this.navCtrl.pop();
  }

  forgotPassword() {
    this.tempEmail = this.email.value.trim();
    this.tempName = this.name.value.trim();
    if(this.tempName === "") {
      this.tempName = "Player";
    }
    if(this.tempEmail === "") {
      this.toastCtrl.create({
        message: "Invalid or Unregistered Email",
        duration: 1500
      }).present();
      return false;
    }
    this.dataService.resetPassword(this.tempEmail, this.tempName).subscribe(
      (response) => {
        if(response === 1) {
          this.toastCtrl.create({
            message: "Password  sent to " +  this.tempEmail,
            duration: 1500
          }).present();
        }
      }
    );
  }
}
