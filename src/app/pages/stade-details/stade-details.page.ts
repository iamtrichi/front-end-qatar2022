import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-stade-details',
  templateUrl: './stade-details.page.html',
  styleUrls: ['./stade-details.page.scss'],
})
export class StadeDetailsPage implements OnInit {

  item;
  constructor(private route: ActivatedRoute, private crud: CrudService, private sanitization: DomSanitizer) {

    const joueurId = this.route.snapshot.paramMap.get('stadeId') || '0';

    if (joueurId !== '0') {
      this.crud.getById(Number(joueurId), 'stade').subscribe(data => this.item = data);
    }
  }

  ngOnInit() {

  }

}
