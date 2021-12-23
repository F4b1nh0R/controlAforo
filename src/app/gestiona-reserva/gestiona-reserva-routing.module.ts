import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionaReservaPage } from './gestiona-reserva.page';

/*const routes: Routes = [
  {
    path: '',
    component: GestionaReservaPage
  }
];
*/

@NgModule({
  imports: [/*RouterModule.forChild(routes)*/],
  exports: [RouterModule],
})
export class GestionaReservaPageRoutingModule {}
