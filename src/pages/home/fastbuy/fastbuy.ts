import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, FabButton } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { MineProvider } from '../../../providers/mine/mine';

/*
  Generated class for the Fastbuy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
   selector: 'page-fastbuy',
   templateUrl: 'fastbuy.html'
})
export class FastbuyPage {
   infiniteScroll: any;
   size: any = 10;

   category: any;
   data: any;
   selected = 0;
   page = 1;
   @ViewChild(Content) content: Content;
   @ViewChild(FabButton) fabButton: FabButton;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpService: HttpService,
      private elementRef: ElementRef,
      private mine: MineProvider,
   ) { }
   ngOnInit() {
      this.httpService.getCategoryPromote().then((data) => {
         if (data.status) {
            this.category = data;
         }
      })
      this.getData(this.selected);
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad FastbuyPage');
   }
   ngAfterViewInit() {
      /* 回到顶部按钮 */
      this.fabButton.setElementClass('fab-button-out', true);
      this.content.ionScroll.subscribe((d) => {
         this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
      });
   }
   getData(id) {
      this.page = 1;

      this.infiniteScroll ? this.infiniteScroll.enable(true) : null;

      this.httpService.presell({ page: this.page, num: this.size, type: 'is_promote', cat_id: id }).then((res) => {
         if (res.status == 1) {
            this.selected = id;
            this.data = res;
         }
      })
   }
   goParticularsPage(id) {
      this.navCtrl.push('ParticularsPage', { goodsId: id, isActivity: 1 })
   }
   scrollToTop() {
      this.content.scrollToTop();
   }
   doInfinite(infiniteScroll) {
      this.infiniteScroll = infiniteScroll;
      this.httpService.presell({ num: this.size, page: ++this.page, type: 'is_promote', cat_id: this.selected }, { showLoading: false }).then((res) => {
         if (res.status == 1) {
            if (!res.data.length) {
               this.infiniteScroll.enable(false);
            }
            this.data.data = this.data.data.concat(res.data);
         }
         setTimeout(() => {
            this.infiniteScroll.complete();
         }, 500);
      })
   }
}
