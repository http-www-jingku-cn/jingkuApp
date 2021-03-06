import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, Nav, IonicApp, Events, Keyboard, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Native } from "../providers/native";
import { UpgradeProvider } from '../providers/upgrade/upgrade';
import { JpushService } from '../providers/jpush-service';
import { HttpService } from '../providers/http-service';
import { CustomeServicesProvider } from '../providers/custome-services/custome-services';

declare var BaiduMobStat: any;
declare let _hmt;
declare let webim;
@Component({
   templateUrl: 'app.html'
})
export class MyApp {
   rootPage: any;
   rootParams: any;
   backButtonPressed: boolean = false;  //用于判断返回键是否触发
   @ViewChild(Nav) nav: Nav;

   constructor(
      private platform: Platform,
      private toastCtrl: ToastController,
      private storage: Storage,
      private ionicApp: IonicApp,
      private events: Events,
      private statusBar: StatusBar,
      private splashScreen: SplashScreen,
      private keyboard: Keyboard,
      private native: Native,
      private upgradeProvider: UpgradeProvider,
      private jpushServ: JpushService,
      private app: App,
      private httpServ: HttpService,
      private customeServ: CustomeServicesProvider,
   ) {
      //———————————————————————— app更新 ————————————————————————
      this.initializeApp();
      //用户失效事件
      this.events.subscribe('signOut', () => {
         this.storage.remove('hasLoggedIn');
         this.storage.remove("token");
         this.storage.remove("login_info");

         this.jpushServ.deleteAlias();//删除推送别名
         this.jpushServ.cleanTags();//删除推送标签
         
         this.customeServ.webimLogout();

         if (this.native.isMobile()) {
            this.nav.setRoot('LoginPage', {}, { animate: true, });
         } else {
            this.nav.setRoot('WellcomeNewmPage', {}, { animate: true, });
         }
      })

      app.viewDidEnter.subscribe((e) => {
         if (e.id && e.id.indexOf('Page') > -1) {
            if(typeof BaiduMobStat != 'undefined')BaiduMobStat.onPageStart(e.id);
            if(typeof BaiduMobStat != 'undefined')BaiduMobStat.onEventWithAttributes('hash', '链接', { "hash": '/' + location.hash })
         }
      })
      app.viewDidLeave.subscribe((e) => {
         if (e.id && e.id.indexOf('Page') > -1) {
            if(typeof BaiduMobStat != 'undefined')BaiduMobStat.onPageEnd(e.id);
         }
      })
      
      this.app.viewWillEnter.subscribe((e) => {//网站点击统计
         if (e._cssClass == 'ion-page') {
            if (e.id == "ParticularsPage") {
               this.httpServ.click_census({ type: 'goods', url: '/' + location.hash, id: e.data.goodsId });//用户点击统计
            }
            if (e.id == "HelperDetailsPage") {
               this.httpServ.click_census({ type: 'article', url: '/' + location.hash, id: e.data.article_id });//用户点击统计
            }
         }
      })
   }
   ngOnDestroy() {
      this.events.unsubscribe("signOut");
   }
   initializeApp() {
      this.platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         // Here you can do any higher level native things you might need.
         this.native.isAndroid() ? this.statusBar.styleLightContent() : this.statusBar.styleDefault();
         this.splashScreen.hide();

         if (this.native.isMobile()) {
            if(this.native.isAndroid()){
               this.upgradeProvider.detectionUpgrade();
            }
            this.storage.get('has_entered').then((result) => {
               if (!result) {
                  this.rootPage = 'WelcomePage';
               } else {
                  //———————————————————————— 初次进入app引导页面 ————————————————————————
                  this.rootPage = 'AppAdvertisingPage';
               }
            })
         } else {
            if (!this.native.isMobileweb()) {
               location.href = 'https://www.jingku.cn/default.html';
               return;
            }
            if (location.href.indexOf('signup') > -1) {
               // this.rootPage = 'SignupPage';
            } else if (location.href.indexOf('custome-services') > -1) {

            } else {
               // this.rootPage = 'WellcomeNewmPage';
               this.storage.get('hasLoggedIn').then((result) => {
                  if (result) {
                     this.rootPage = 'TabsPage';//TabsPage//WellcomeNewmPage
                     // this.nav.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });
                  } else {
                     this.rootPage = 'WellcomeNewmPage';
                     // this.nav.setRoot('WellcomeNewmPage', {}, { animate: true, direction: 'forward' });
                  }
               });
            }
         }
         // 初始化极光推送
         this.jpushServ.init();
         this.jpushServ.setDebugMode(false);
         this.jpushServ.getRegistrationID().then(res => {
            this.jpushServ.setTags([res]);
         })
         //———————————————————————— 注册返回按键事件 ————————————————————————
         this.platform.registerBackButtonAction((): any => {
            if (this.keyboard.isOpen()) {
               this.keyboard.close();
               return;
            }
            let activeVC = this.nav.getActive();
            let page = activeVC.instance;
            let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._loadingPortal.getActive() /* || this.ionicApp._overlayPortal.getActive(); *//*this.ionicApp._toastPortal.getActive() || */
            if (activePortal) {
               activePortal.dismiss().catch(() => { });
               activePortal.onDidDismiss(() => { });
               return;
            }
            //当前页面非tab栏
            if (!(page instanceof TabsPage)) {
               if (!this.nav.canGoBack()) {
                  return this.showExit();
               }
               return this.nav.pop().catch(res => { history.back() });
            }
            let tabs = page.tabs;
            let activeNav = tabs.getSelected();
            //当前页面为tab栏，退出APP,当前页面为tab栏的子页面，正常返回
            return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
         }, 1);
         //————————————————————————————————————————————————————————————————————————
      });
   }
   //双击退出提示框
   showExit() {
      if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
         this.platform.exitApp();
      } else {
         this.toastCtrl.create({
            message: '再按一次退出应用',
            duration: 2000,
            position: 'top'
         }).present();
         this.backButtonPressed = true;
         setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
      }
   }
}