import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisReservasPageRoutingModule } from './mis-reservas-routing.module';

import { MisReservasPage } from './mis-reservas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisReservasPageRoutingModule
  ],
  declarations: [MisReservasPage]
})
export class MisReservasPageModule {}
