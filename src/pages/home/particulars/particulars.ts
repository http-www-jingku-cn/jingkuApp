import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
/*http服务*/
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";


import { ParticularsModalPage } from "./particulars-modal/particulars-modal"
import { ParticularsModalAttrPage } from "./particulars-modal-attr/particulars-modal-attr";
import { AccountServicePage } from "../../my/account-service/account-service";

/*
  Generated class for the Particulars page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-particulars',
  templateUrl: 'particulars.html'
})
export class ParticularsPage {
  getCategoryRecommendGoodsHot: any;
  getLinkedGoods: any;
  getGoodsAttribute: any;
  getGoodsGallery: any;
  getPriceSection: any;
  getGoodsInfo: any;
  getGoodsParameter: any;
  getGoodsSaleCity: any;
  getSupplierInfo: any;
  getBonus: any;
  getGoodsFittings: any;
  collectDel: any;
  searchGoods: any;
  care: any;

  selectGroupRecommend = "group";
  selectPicArguments = "pic";

  goodsId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpService,
    public modalCtrl: ModalController,
    public native: Native,
    private events: Events
  ) {
    this.goodsId = this.navParams.get('goodsId') || '3994';/*3994 5676*/
    console.log("商品ID:", this.goodsId)
  }
  ionViewDidLoad() {
    this.getHttpDetails();
    console.log('ionViewDidLoad ParticularsPage');
  }
  getHttpDetails(finished?) {
    this.native.showLoading();
    this.http.goodsInfos({ goods_id: this.goodsId }).then((res) => {
      console.log("商品详情信息", res);
      if (res.status == 1) { this.getGoodsInfo = res; }
      this.http.getCategoryRecommendGoodsHot({}).then((res) => {
        console.log('为你推荐：', res)
        if (res.status == 1) { this.getCategoryRecommendGoodsHot = res.data; }
        this.native.hideLoading();
        if (finished) { finished() }
      })
    })
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.getHttpDetails(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    });
  }
  presentModal(str) {
    let modal = this.modalCtrl.create(ParticularsModalPage, { name: str, getBonus: this.getGoodsInfo.bonus, sendto: this.getGoodsInfo.sale_city, GoodsInfo: this.getGoodsInfo.data });
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }
  /**
   * 除商品属性 弹窗
   */
  presentModalAttr() {
    this.native.showLoading();
    this.http.getGoodsAttribute({ goods_id: this.goodsId }).then((res) => {
      this.native.hideLoading();
      if (res.status == 1) {
        console.log("商品初始属性", res);
        this.getGoodsAttribute = res;
        if (res.status == 1) {
          if (res.goods_type == 'goods_spectacles') {
            console.log("goods_type ☞'goods_spectacles'", res);
            this.openAttrModal(res, 'goods_spectacles');
          }
          if (res.goods_type == 'goods') {
            this.http.getAttrList({ goods_id: this.goodsId }).then((res) => {
              console.log("goods_type ☞'goods'", res);
              this.openAttrModal(res, 'goods');
            })
          }
        }
      }
    })
  }
  /**
   * 
   * @param res 商品属性列表
   * @param type 商品类型（镜片、镜架）
   */
  openAttrModal(res, type) {
    let modal = this.modalCtrl.create(ParticularsModalAttrPage, { data: res, type: type, headData: this.getGoodsInfo.data, id: this.goodsId });
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data);
      }
    });
    modal.present();
  }
  /*---商品关注----*/
  beCareFor() {
    if (this.getGoodsInfo.data.is_collect) {
      this.http.collectDel({ goods_id: this.goodsId }).then((res) => {
        console.log("取消商品关注", res);
        if (res.status) {
          this.getGoodsInfo.data.is_collect = 0;
          this.native.showToast('已取消关注')
        }
      });
    } else {
      this.http.getGoodsCollect({ goods_id: this.goodsId }).then((res) => {
        console.log("商品关注", res);
        if (res.status) {
          this.getGoodsInfo.data.is_collect = 1;
          this.native.showToast('关注成功')
        }
      });
    }
  }
  addToShoppingCart() {
    if (this.getGoodsAttribute.status == 1) {
      if (this.getGoodsAttribute.goods_type == 'goods') {
        this.http.getAttrList({ goods_id: this.goodsId }).then((res) => {
          console.log("goods_type ☞'goods'", res);
          this.http.addToCartSpec().then((res) => {
            console.log('普通商品加入购物车：', res)
            if (res.status == 1) {
              this.native.showToast('已经加入购物车');
              this.events.publish('car:updata');
            }
          })
        })
      }
      if (this.getGoodsAttribute.goods_type == 'goods_spectacles') {
        console.log("goods_type ☞'goods_spectacles'");
        this.http.addToCartSpecJp().then((res) => {
          console.log('镜片商品加入购物车：', res)
          if (res.status == 1) {
            this.native.showToast('已经加入购物车')
            this.events.publish('car:updata');
          }
        })
      }
    }
  }
  openCallNumber() {
    this.native.openCallNumber(this.getSupplierInfo.mobile, true);
  }
  goAccountServicePage() {
    this.navCtrl.push(AccountServicePage)
  }

}
