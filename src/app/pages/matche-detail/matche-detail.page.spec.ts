import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatcheDetailPage } from './matche-detail.page';

describe('MatcheDetailPage', () => {
  let component: MatcheDetailPage;
  let fixture: ComponentFixture<MatcheDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatcheDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatcheDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
