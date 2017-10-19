import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the WatchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment: 'watch/:mid'
})
@Component({
  selector: 'page-watch',
  templateUrl: 'watch.html',
})
export class WatchPage {
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
  ) {
    this.httpService.machiningInfo({ mid: this.navParams.get('mid') }).then((res) => {
      if (res.status) {
        this.data = res;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WatchPage');
  }


}
