import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AforoPageRoutingModule } from './aforo-routing.module';

import { AforoPage } from './aforo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AforoPageRoutingModule
  ],
  declarations: [AforoPage]
})
export class AforoPageModule {}
