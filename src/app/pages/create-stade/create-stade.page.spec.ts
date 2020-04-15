import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateStadePage } from './create-stade.page';

describe('CreateStadePage', () => {
  let component: CreateStadePage;
  let fixture: ComponentFixture<CreateStadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
