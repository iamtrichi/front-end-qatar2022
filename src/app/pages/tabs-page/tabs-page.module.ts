import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { JoueurPageModule } from '../joueur/joueur.module';
import { CreateJoueurPageModule } from '../create-joueur/create-joueur.module';
import { EquipePageModule } from '../equipe/equipe.module';
import { CreateEquipePageModule } from '../create-equipe/create-equipe.module';
import { DetailEquipeJoueurPageModule } from '../detail-equipe-joueur/detail-equipe-joueur.module';
import { CreateStadePageModule } from '../create-stade/create-stade.module';
import { StadeDetailsPageModule } from '../stade-details/stade-details.module';
import { CreateStaffPageModule } from '../create-staff/create-staff.module';
import { StaffPageModule } from '../staff/staff.module';
import { MatchePageModule } from '../matche/matche.module';
import { MatcheDetailPageModule } from '../matche-detail/matche-detail.module';
import { CreateMatchePageModule } from '../create-matche/create-matche.module';
import { PopoverPage } from './../about-popover/about-popover';

@NgModule({
  imports: [
  CommonModule,
    IonicModule,
    TabsPageRoutingModule,
    JoueurPageModule,
    CreateJoueurPageModule,
    EquipePageModule,
    CreateEquipePageModule,
    DetailEquipeJoueurPageModule,
    CreateStadePageModule,
    StadeDetailsPageModule,
    StaffPageModule,
    CreateStaffPageModule,
    MatchePageModule,
    MatcheDetailPageModule,
    CreateMatchePageModule
  ],
  declarations: [
    TabsPage, PopoverPage],
    entryComponents: [PopoverPage],
})
export class TabsModule { }
