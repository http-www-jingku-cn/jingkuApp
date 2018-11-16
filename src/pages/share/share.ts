import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MineProvider } from '../../providers/mine/mine';
import { HttpService } from '../../providers/http-service';
import { Native } from '../../providers/native';
import { WxServiceProvider } from '../../providers/wx-service/wx-service';
import { IP } from '../../providers/constants';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
   segment: 'share'
})
@Component({
   selector: 'page-share',
   templateUrl: 'share.html',
})
export class SharePage {
   data: any;
   showMark: boolean = false;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public mine: MineProvider,
      public httpServ: HttpService,
      private wxService: WxServiceProvider,
      private native: Native,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad SharePage');
   }

   ngOnInit() {

      this.mine.userInfo && this.httpServ.Share({ signup: this.mine.userInfo.data.UserShare }).then(res => {
         if (res.status == 1) {
            this.data = res;
            setTimeout(() => {
               this.wxService.config({
                  title: '我正在使用镜库，推荐给你。30元代金券一并奉上', // 分享标题
                  desc: '眼镜业B2B专业服务平台', // 分享描述
                  link: IP + '/#/nav/n4/signup/' + this.mine.userInfo.data.UserShare, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
               })
            }, 400)
         }
      })
   }

   sharing() {
      if (this.native.isWeixin()) {
         this.showMark = true;
      } else if (this.native.isMobile()) {
         
      } else {
         this.native.showToast('请在镜库公众号或者app打开')
      }
   }
}