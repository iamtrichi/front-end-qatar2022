import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMatchePageRoutingModule } from './create-matche-routing.module';

import { CreateMatchePage } from './create-matche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMatchePageRoutingModule
  ],
  declarations: [CreateMatchePage]
})
export class CreateMatchePageModule {}
