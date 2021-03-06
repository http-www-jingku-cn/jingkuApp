import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/*
  Generated class for the AccountService page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-account-service',
  templateUrl: 'account-service.html'
})
export class AccountServicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountServicePage');
  }

}
