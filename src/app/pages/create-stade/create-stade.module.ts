import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStadePageRoutingModule } from './create-stade-routing.module';

import { CreateStadePage } from './create-stade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStadePageRoutingModule
  ],
  declarations: [CreateStadePage]
})
export class CreateStadePageModule {}
