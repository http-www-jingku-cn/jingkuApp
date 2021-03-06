import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseLensLPage } from './choose-lens-l';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { AccountProcessProvider } from '../account-process-provider';

@NgModule({
   declarations: [
      ChooseLensLPage,
   ],
   imports: [
      IonicPageModule.forChild(ChooseLensLPage),
      ImgLazyLoadDirectiveModule
   ],
   providers: [AccountProcessProvider]
})
export class ChooseLensLPageModule { }
