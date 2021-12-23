import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModAforoPageRoutingModule } from './mod-aforo-routing.module';

//import { ModAforoPage } from './mod-aforo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModAforoPageRoutingModule
  ],
  declarations: [
    //ModAforoPage
  ]
})
export class ModAforoPageModule {}
