import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchePage } from './matche.page';

const routes: Routes = [
  {
    path: '',
    component: MatchePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchePageRoutingModule {}
