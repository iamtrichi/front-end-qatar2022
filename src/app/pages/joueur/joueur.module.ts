import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoueurPageRoutingModule } from './joueur-routing.module';

import { JoueurPage } from './joueur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoueurPageRoutingModule
  ],
  declarations: [JoueurPage]
})
export class JoueurPageModule {}
