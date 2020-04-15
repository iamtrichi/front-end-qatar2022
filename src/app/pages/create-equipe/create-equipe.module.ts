import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEquipePageRoutingModule } from './create-equipe-routing.module';

import { CreateEquipePage } from './create-equipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEquipePageRoutingModule
  ],
  declarations: [CreateEquipePage]
})
export class CreateEquipePageModule {}
