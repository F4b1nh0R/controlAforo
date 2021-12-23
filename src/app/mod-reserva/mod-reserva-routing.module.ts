import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModReservaPage } from './mod-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: ModReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModReservaPageRoutingModule {}
