import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StadeDetailsPageRoutingModule } from './stade-details-routing.module';

import { StadeDetailsPage } from './stade-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StadeDetailsPageRoutingModule
  ],
  declarations: [StadeDetailsPage]
})
export class StadeDetailsPageModule {}
