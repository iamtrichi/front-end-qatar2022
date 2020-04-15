import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatchePage } from './matche.page';

describe('MatchePage', () => {
  let component: MatchePage;
  let fixture: ComponentFixture<MatchePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
