import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStadePage } from './create-stade.page';

const routes: Routes = [
  {
    path: '',
    component: CreateStadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateStadePageRoutingModule {}
