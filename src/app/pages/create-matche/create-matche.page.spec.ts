import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateMatchePage } from './create-matche.page';

describe('CreateMatchePage', () => {
  let component: CreateMatchePage;
  let fixture: ComponentFixture<CreateMatchePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMatchePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMatchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
