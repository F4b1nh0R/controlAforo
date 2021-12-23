import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionaReservaPageRoutingModule } from './gestiona-reserva-routing.module';

import { GestionaReservaPage } from './gestiona-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionaReservaPageRoutingModule
  ],
  declarations: [GestionaReservaPage]
})
export class GestionaReservaPageModule {}
