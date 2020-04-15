import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateJoueurPage } from './create-joueur.page';

describe('CreateJoueurPage', () => {
  let component: CreateJoueurPage;
  let fixture: ComponentFixture<CreateJoueurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateJoueurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateJoueurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
