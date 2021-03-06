import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsultationsComponent } from './admin-consultations.component';

describe('AdminConsultationsComponent', () => {
  let component: AdminConsultationsComponent;
  let fixture: ComponentFixture<AdminConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConsultationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
