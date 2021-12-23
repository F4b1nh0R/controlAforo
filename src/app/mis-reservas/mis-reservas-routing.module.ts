import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisReservasPage } from './mis-reservas.page';

/*const routes: Routes = [
  {
    path: '',
    component: MisReservasPage
  }
];*/

@NgModule({
  imports: [/*RouterModule.forChild(routes)*/],
  exports: [RouterModule],
})
export class MisReservasPageRoutingModule {}
