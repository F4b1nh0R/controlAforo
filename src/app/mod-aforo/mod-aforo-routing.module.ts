import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModAforoPage } from './mod-aforo.page';

const routes: Routes = [
  {
    path: '',
    component: ModAforoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModAforoPageRoutingModule {}
