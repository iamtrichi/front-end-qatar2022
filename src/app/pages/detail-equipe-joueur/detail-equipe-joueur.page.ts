import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-equipe-joueur',
  templateUrl: './detail-equipe-joueur.page.html',
  styleUrls: ['./detail-equipe-joueur.page.scss'],
})
export class DetailEquipeJoueurPage implements OnInit {
  item;
  type;
  constructor(private route: ActivatedRoute, private crud: CrudService, private sanitization: DomSanitizer) {
    const joueurId = this.route.snapshot.paramMap.get('joueurId') || '0';
    const equipeId = this.route.snapshot.paramMap.get('equipeId') || '0';
    if (joueurId !== '0') {
      this.crud.getById(Number(joueurId), 'joueur').subscribe(data => this.item = data);
      this.type = 'joueur';
    } else {
      this.crud.getById(Number(equipeId), 'equipe').subscribe(data => this.item = data);
      this.type = 'equipe';
    }
    console.log(this.type);
   }

  ngOnInit() {
  }
  getAge(str: string) {
    return new Date().getFullYear() - Number(str.substr(0, 4));
  }

}
