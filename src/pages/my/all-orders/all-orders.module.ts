import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllOrdersPage } from "./all-orders";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { ImgTabsModule } from "../../../components/img-tabs/img-tabs.module";

@NgModule({
  declarations: [AllOrdersPage],
  imports: [
    IonicPageModule.forChild(AllOrdersPage),
    ImgLazyLoadDirectiveModule,
    ImgTabsModule
  ]
})

export class AllOrdersPageModule { }