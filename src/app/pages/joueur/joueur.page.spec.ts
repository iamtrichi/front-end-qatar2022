import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoueurPage } from './joueur.page';

describe('JoueurPage', () => {
  let component: JoueurPage;
  let fixture: ComponentFixture<JoueurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoueurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoueurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
