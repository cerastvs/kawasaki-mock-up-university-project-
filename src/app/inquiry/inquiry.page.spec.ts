import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InquiryPage } from './inquiry.page';

describe('InquiryPage', () => {
  let component: InquiryPage;
  let fixture: ComponentFixture<InquiryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
