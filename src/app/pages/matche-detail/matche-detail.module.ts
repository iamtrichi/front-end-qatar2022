import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatcheDetailPageRoutingModule } from './matche-detail-routing.module';

import { MatcheDetailPage } from './matche-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatcheDetailPageRoutingModule
  ],
  declarations: [MatcheDetailPage]
})
export class MatcheDetailPageModule {}
