import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailEquipeJoueurPage } from './detail-equipe-joueur.page';

describe('DetailEquipeJoueurPage', () => {
  let component: DetailEquipeJoueurPage;
  let fixture: ComponentFixture<DetailEquipeJoueurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEquipeJoueurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEquipeJoueurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
