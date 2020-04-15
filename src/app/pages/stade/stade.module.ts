import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StadePageRoutingModule } from './stade-routing.module';

import { StadePage } from './stade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StadePageRoutingModule
  ],
  declarations: [StadePage]
})
export class StadePageModule {}
