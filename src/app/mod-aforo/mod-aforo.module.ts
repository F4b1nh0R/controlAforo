import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModAforoPageRoutingModule } from './mod-aforo-routing.module';

import { ModAforoPage } from './mod-aforo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModAforoPageRoutingModule
  ],
  declarations: [ModAforoPage]
})
export class ModAforoPageModule {}
