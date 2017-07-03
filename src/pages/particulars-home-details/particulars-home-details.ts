import { Component,Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopAllFashionPage } from "../shop-all-fashion/shop-all-fashion";
import { HttpService } from "../../providers/http-service";

/**
 * Generated class for the ParticularsHomeDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-particulars-home-details',
  templateUrl: 'particulars-home-details.html',
})
export class ParticularsHomeDetailsPage {
  shopInfo_data: any;

  goShopFashion() {
    this.navCtrl.push(ShopAllFashionPage);
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private el: ElementRef,
    private renderer: Renderer,
    private httpService: HttpService) {

    this.httpService.getSupplierInfo({ supplier_id: navParams.get('supplierId') }).then((res) => {
      if (res.status == 1) {
        this.shopInfo_data = res;
        console.log(res);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsHomeDetailsPage');
  }

}
