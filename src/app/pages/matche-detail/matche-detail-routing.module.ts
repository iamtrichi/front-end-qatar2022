import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatcheDetailPage } from './matche-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MatcheDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatcheDetailPageRoutingModule {}
