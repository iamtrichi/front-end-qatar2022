import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StadeDetailsPage } from './stade-details.page';

const routes: Routes = [
  {
    path: '',
    component: StadeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StadeDetailsPageRoutingModule {}
