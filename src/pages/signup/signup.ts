import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataService } from '../../app/dataservice/data.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild('confirmPassword') confirmPass: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    public toastCtrl: ToastController) {
  }

  goBackToLogin() {
    this.navCtrl.pop();
  }

  validate(form): boolean {
    if (form.name.trim() === "" || form.email.trim() === "" ||
      form.mobile.trim() === "" || form.company.trim() === "" || form.password.trim() === "" || 
      form.password.trim() !== this.confirmPass.value.trim()) {
      this.toastCtrl.create({
        message: "Register fields should not be left blank or unmatched password!",
        duration: 1500
      }).present();
      return false;
    } else {
      return true;
    }
  }

  onSubmit(form: NgForm) {
    form.value.email = form.value.email.toLowerCase();
    if (this.validate(form.value)) {
      this.dataService.registerPlayer(form.value).subscribe();
      setTimeout(() => {
        this.navCtrl.pop();
        this.toastCtrl.create({
          message: "Registration was successful!",
          duration: 1500
        }).present();
      }, 500);
      
      /* 
      this.dataService.registerPlayer(form.value).subscribe(
        () => {
          setTimeout(() => {
            this.navCtrl.pop();
            this.toastCtrl.create({
              message: "Registration was successful!",
              duration: 1500
            }).present();
          }, 500);
        },
        (error) => {
          console.log(error);
          this.toastCtrl.create({
            message: "Please retry!",
            duration: 1500
          }).present();
        }
      );
      */
    }
  }
}
