import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";
import { IonicStorageModule } from '@ionic/storage';
/*———————————————————————————————— base页 ————————————————————————————————*/
import { MyApp } from './app.component';
/*———————————————————————————————— 服务 ————————————————————————————————*/
import { UserData } from "../providers/user-data";
import { Native } from "../providers/native";
import { HttpService } from "../providers/http-service";
import { JpushService } from "../providers/jpush-service";
/*———————————————————————————————— ionic-native ————————————————————————————————*/
import { AppVersion } from '@ionic-native/app-version';
import { Badge } from '@ionic-native/badge';
import { ImagePicker } from "@ionic-native/image-picker";
import { CallNumber } from '@ionic-native/call-number';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Toast } from '@ionic-native/toast';
import { Transfer } from "@ionic-native/transfer";
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { JPush } from '@jiguang-ionic/jpush';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Clipboard } from '@ionic-native/clipboard';
/*———————————————————————————————— 插件 ————————————————————————————————*/
import { MeunItemComponentModule } from "../components/meun-item/meun-item.module";
import { MeunCategoryComponentModule } from '../components/meun-category/meun-category.module';
import { CityPickerModule } from "ionic2-city-picker/dist/city-picker.module";
import { UpgradeProvider } from '../providers/upgrade/upgrade';
import { WxServiceProvider } from '../providers/wx-service/wx-service';
import { ChatProvider } from '../providers/chat/chat';
import { XimuProvider } from '../providers/ximu/ximu';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MineProvider } from '../providers/mine/mine';
import { preApplyParams } from '../pages/BT/preApplyParams';
import { CustomeServicesProvider } from '../providers/custome-services/custome-services';

@NgModule({
   declarations: [
      MyApp,
   ],
   imports: [
      IonicModule.forRoot(MyApp, {
         platforms: {
            ios: {
               scrollAssist: true,
               autoFocusAssist: true,
               scrollPadding: true
            },
            android: {
               backButtonIcon: 'ios-arrow-back'
            }
         },
         backButtonText: '',
         // mode: 'ios',
         tabsHideOnSubPages: true,
         tabsPlacement: 'bottom',
         swipeBackEnabled: true,
         // activator: "highlight",
      }),
      IonicStorageModule.forRoot(),
      HttpModule,
      BrowserModule,
      MeunItemComponentModule,
      MeunCategoryComponentModule,
      CityPickerModule,
      ionicGalleryModal.GalleryModalModule,
   ],
   bootstrap: [IonicApp],
   entryComponents: [
      MyApp
   ],
   providers: [
      JPush,
      UserData,
      Native,
      HttpService,
      JpushService,
      UpgradeProvider,
      Camera,
      QRScanner,
      ImagePicker,
      AppVersion,
      Toast,
      CallNumber,
      StatusBar,
      SplashScreen,
      Badge,
      Transfer,
      File,
      InAppBrowser,
      WxServiceProvider,
      ChatProvider,
      XimuProvider,
      { provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig, },
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      MineProvider,
      preApplyParams,
      Clipboard,
      CustomeServicesProvider
   ]
})
export class AppModule { }
