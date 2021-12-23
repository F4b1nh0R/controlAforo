import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModReservaPageRoutingModule } from './mod-reserva-routing.module';

import { ModReservaPage } from './mod-reserva.page';
import { GestionaReservaPage } from '../gestiona-reserva/gestiona-reserva.page';
import { GestionaReservaPageModule } from '../gestiona-reserva/gestiona-reserva.module';
@NgModule({
  entryComponents:[
    GestionaReservaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModReservaPageRoutingModule,
    GestionaReservaPageModule,
  ],
  declarations: [ModReservaPage]
})
export class ModReservaPageModule {}
