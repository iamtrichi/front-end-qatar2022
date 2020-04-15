import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoueurPage } from './joueur.page';

const routes: Routes = [
  {
    path: '',
    component: JoueurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoueurPageRoutingModule {}
