import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEquipeJoueurPageRoutingModule } from './detail-equipe-joueur-routing.module';

import { DetailEquipeJoueurPage } from './detail-equipe-joueur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailEquipeJoueurPageRoutingModule
  ],
  declarations: [DetailEquipeJoueurPage]
})
export class DetailEquipeJoueurPageModule {}
