import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProcessPage } from './add-process';

@NgModule({
  declarations: [AddProcessPage],
  imports: [
    IonicPageModule.forChild(AddProcessPage),
  ]
})

export class AddProcessPageModule { }