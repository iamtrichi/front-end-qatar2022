import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StadePage } from './stade.page';

describe('StadePage', () => {
  let component: StadePage;
  let fixture: ComponentFixture<StadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
