import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipePage } from './equipe.page';

describe('EquipePage', () => {
  let component: EquipePage;
  let fixture: ComponentFixture<EquipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
