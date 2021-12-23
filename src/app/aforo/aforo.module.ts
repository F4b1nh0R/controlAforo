import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AforoPageRoutingModule } from './aforo-routing.module';

import { AforoPage } from './aforo.page';
import { ModAforoPage } from '../mod-aforo/mod-aforo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AforoPageRoutingModule
  ],
  declarations: [AforoPage, ModAforoPage],
  entryComponents:[ModAforoPage]
})
export class AforoPageModule {}
