import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

import { UserData } from "../../services/user-data";
import { AnalyticsServices } from "../../services/analytics";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AnalyticsServices]
})
export class LoginPage {
  private loginInfo: { username?: string, password?: string } = {};
  private submitted = false;
  private isLoginError = false;
  constructor(
    public navCtrl: NavController,
    private userData: UserData,
    private events: Events,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public analytics: AnalyticsServices
  ) {
    this.init();
    this.eventHandle();
  }
  init(){
    // this.loginInfo.username = this.userData.getUsername();
  }
  goToHome(form: NgForm) {
    if (form.valid) {
      console.log(form)
      this.userData.login(this.loginInfo);
    }
  };
  eventHandle() {
    let self = this;
    this.events.subscribe("user:login", (userEventData) => {
      let toast = self.toastCtrl.create({
        message: "欢迎回来," + userEventData,
        duration: 2000,
        position: "top"
      });
      toast.present();
      this.submitted = true;
      self.analytics.trackEvent("Login", "Successful");
      self.navCtrl.push(TabsPage);
    });

    this.events.subscribe("user:login:error", () => {
      self.isLoginError = true;
    });
  }
  goSignup() {
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage')
  }

}
