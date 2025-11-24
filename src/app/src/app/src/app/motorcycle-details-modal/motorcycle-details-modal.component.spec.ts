import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MotorcycleDetailsModalComponent } from './motorcycle-details-modal.component';

describe('MotorcycleDetailsModalComponent', () => {
  let component: MotorcycleDetailsModalComponent;
  let fixture: ComponentFixture<MotorcycleDetailsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MotorcycleDetailsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MotorcycleDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
