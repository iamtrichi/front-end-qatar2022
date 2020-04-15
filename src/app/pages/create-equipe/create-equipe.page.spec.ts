import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateEquipePage } from './create-equipe.page';

describe('CreateEquipePage', () => {
  let component: CreateEquipePage;
  let fixture: ComponentFixture<CreateEquipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEquipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEquipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
