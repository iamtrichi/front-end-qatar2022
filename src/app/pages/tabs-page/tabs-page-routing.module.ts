import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'joueur',
        children: [
          {
            path: '',
            loadChildren: () => import('../joueur/joueur.module').then(m => m.JoueurPageModule)
          },
          {
            path: 'create-joueur/:joueurId',
            loadChildren: () => import('../create-joueur/create-joueur.module').then( m => m.CreateJoueurPageModule)
          },
          {
            path: 'detail-equipe-joueur/:joueurId',
            loadChildren: () => import('../detail-equipe-joueur/detail-equipe-joueur.module').then( m => m.DetailEquipeJoueurPageModule)
          }
        ]
      },
      {
        path: 'equipe',
        children: [
          {
            path: '',
            loadChildren: () => import('../equipe/equipe.module').then( m => m.EquipePageModule)
          },
          {
            path: 'create-equipe/:equipeId',
            loadChildren: () => import('../create-equipe/create-equipe.module').then( m => m.CreateEquipePageModule)
          },
          {
            path: 'detail-equipe-joueur/:equipeId',
            loadChildren: () => import('../detail-equipe-joueur/detail-equipe-joueur.module').then( m => m.DetailEquipeJoueurPageModule)
          },
          {
            path: 'staff',
            children: [
              {
                path: '',
                loadChildren: () => import('../staff/staff.module').then( m => m.StaffPageModule)
              },
              {
                path: 'create-staff',
                loadChildren: () => import('../create-staff/create-staff.module').then( m => m.CreateStaffPageModule)
              }
            ]
          }
        ]
      },
      {
        path: 'matche',
        children: [
          {
            path: '',
            loadChildren: () => import('../matche/matche.module').then( m => m.MatchePageModule)
          },
          {
            path: 'create-matche',
            loadChildren: () => import('../create-matche/create-matche.module').then( m => m.CreateMatchePageModule)
          },
          {
            path: 'matche-detail',
            loadChildren: () => import('../matche-detail/matche-detail.module').then( m => m.MatcheDetailPageModule)
          }
        ]
      },
      {
        path: 'stade',
        children: [
          {
            path: '',
            loadChildren: () => import('../stade/stade.module').then( m => m.StadePageModule)
          },
          {
            path: 'create-stade',
            loadChildren: () => import('../create-stade/create-stade.module').then( m => m.CreateStadePageModule)
          },
          {
            path: 'stade-details/:stadeId',
            loadChildren: () => import('../stade-details/stade-details.module').then( m => m.StadeDetailsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/matche',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

