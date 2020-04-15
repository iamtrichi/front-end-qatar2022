import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateJoueurPageRoutingModule } from './create-joueur-routing.module';

import { CreateJoueurPage } from './create-joueur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateJoueurPageRoutingModule
  ],
  declarations: [CreateJoueurPage]
})
export class CreateJoueurPageModule {}
