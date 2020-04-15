import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchePageRoutingModule } from './matche-routing.module';

import { MatchePage } from './matche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchePageRoutingModule
  ],
  declarations: [MatchePage]
})
export class MatchePageModule {}
