import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item button routerLink="/app/tabs/equipe/staff" (click)="close()" >
        <ion-label>Gérer Staffs</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {}

  support() {
    // this.app.getRootNavs()[0].push('/support');
    this.popoverCtrl.dismiss();
  }

  close(url?: string) {
    if (url) {
      window.open(url, '_blank');
    }
    this.popoverCtrl.dismiss();
  }
}
