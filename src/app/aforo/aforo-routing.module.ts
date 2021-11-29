import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AforoPage } from './aforo.page';

const routes: Routes = [
  {
    path: '',
    component: AforoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AforoPageRoutingModule {}
