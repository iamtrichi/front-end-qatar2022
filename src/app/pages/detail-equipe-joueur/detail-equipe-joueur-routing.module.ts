import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailEquipeJoueurPage } from './detail-equipe-joueur.page';

const routes: Routes = [
  {
    path: '',
    component: DetailEquipeJoueurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailEquipeJoueurPageRoutingModule {}
