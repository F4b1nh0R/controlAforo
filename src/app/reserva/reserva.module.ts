import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaPageRoutingModule } from './reserva-routing.module';

import { ReservaPage } from './reserva.page';
import { MisReservasPage } from '../mis-reservas/mis-reservas.page';
import { MisReservasPageModule } from '../mis-reservas/mis-reservas.module';

@NgModule({
  entryComponents:[
    MisReservasPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReservaPageRoutingModule,
    MisReservasPageModule,
  ],
  declarations: [ReservaPage]
})
export class ReservaPageModule {}
