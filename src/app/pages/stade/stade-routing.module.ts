import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StadePage } from './stade.page';

const routes: Routes = [
  {
    path: '',
    component: StadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StadePageRoutingModule {}
