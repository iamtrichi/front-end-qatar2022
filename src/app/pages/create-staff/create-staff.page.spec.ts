import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateStaffPage } from './create-staff.page';

describe('CreateStaffPage', () => {
  let component: CreateStaffPage;
  let fixture: ComponentFixture<CreateStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
