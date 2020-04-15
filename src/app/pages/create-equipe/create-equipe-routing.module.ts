import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEquipePage } from './create-equipe.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEquipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEquipePageRoutingModule {}
