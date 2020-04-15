import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateJoueurPage } from './create-joueur.page';

const routes: Routes = [
  {
    path: '',
    component: CreateJoueurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateJoueurPageRoutingModule {}
